<template>
  <div class="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
    <!-- Watermark Type Selector -->
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Watermark Type:</label>
      <select v-model="watermarkType" class="mt-2 p-2 border rounded-md w-full">
        <option value="image">Image</option>
        <option value="text">Text</option>
      </select>
    </div>

    <!-- Image Watermark Controls -->
    <div v-if="watermarkType === 'image'" class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Upload Watermark Image:</label>
      <input
        type="file"
        @change="handleWatermarkUpload"
        accept="image/*"
        class="mt-2 p-2 border rounded-md w-full"
      />
      <label class="block mt-4 text-sm font-medium text-gray-700">Opacity:</label>
      <input
        type="range"
        v-model="opacity"
        min="0"
        max="1"
        step="0.1"
        class="mt-2 w-full"
      />
      <p class="text-sm text-gray-500">Opacity: {{ (opacity * 100).toFixed(0) }}%</p>
    </div>

    <!-- Text Watermark Controls -->
    <div v-if="watermarkType === 'text'" class="mt-4">
      <label class="block text-sm font-medium text-gray-700">Watermark Text:</label>
      <input
        v-model="watermarkText"
        type="text"
        placeholder="Enter watermark text"
        class="mt-2 p-2 border rounded-md w-full"
      />

      <label class="block mt-4 text-sm font-medium text-gray-700">Font Size:</label>
      <input
        type="number"
        v-model="fontSize"
        min="10"
        max="100"
        class="mt-2 p-2 border rounded-md w-full"
      />

      <label class="block mt-4 text-sm font-medium text-gray-700">Font Color:</label>
      <input
        type="color"
        v-model="fontColor"
        class="mt-2 w-16 h-10 border rounded-md"
      />

      <label class="block mt-4 text-sm font-medium text-gray-700">Font:</label>
      <select v-model="selectedFont" class="mt-2 p-2 border rounded-md w-full">
        <option v-for="font in availableFonts" :key="font.postscriptName" :value="font.fullName">
          {{ font.fullName }}
        </option>
      </select>

      <label class="block mt-4 text-sm font-medium text-gray-700">Opacity:</label>
      <input
        type="range"
        v-model="opacity"
        min="0"
        max="1"
        step="0.1"
        class="mt-2 w-full"
      />
      <p class="text-sm text-gray-500">Opacity: {{ (opacity * 100).toFixed(0) }}%</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  canvas: {
    type: Object,
    required: true,
  },
});

// Watermark state
const watermarkType = ref('image'); // 'image' or 'text'

// Image Watermark State
const opacity = ref(0.5); // Opacity for both image and text
const watermarkImage = ref(null); // Uploaded watermark image

// Text Watermark State
const watermarkText = ref('Watermark'); // Text content
const fontSize = ref(30); // Font size
const fontColor = ref('#FFFFFF'); // Font color
const selectedFont = ref('Arial'); // Selected font
const availableFonts = ref([]); // List of available fonts

// Base image reference
const baseImage = ref(null);

// Fetch available fonts using Local Font Access API
const fetchLocalFonts = async () => {
  try {
    if ('queryLocalFonts' in window) {
      const fonts = await window.queryLocalFonts();
      availableFonts.value = fonts.filter((font) => font.fullName); // Filter fonts with full names
    } else {
      console.warn('Local Font Access API is not supported in this browser.');
    }
  } catch (error) {
    console.error('Error fetching local fonts:', error);
  }
};

// Watch changes and redraw the canvas
watch([opacity, watermarkText, fontSize, fontColor, selectedFont, watermarkType], () => {
  applyWatermark();
});

// Handle watermark image upload
const handleWatermarkUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    watermarkImage.value = new Image();
    watermarkImage.value.onload = () => {
      applyWatermark();
    };
    watermarkImage.value.src = reader.result;
  };
  reader.readAsDataURL(file);
};

// Redraw the canvas with the watermark
const applyWatermark = () => {
  if (!props.canvas) return;

  const ctx = props.canvas.getContext('2d');

  if (!baseImage.value) {
    baseImage.value = new Image();
    baseImage.value.src = props.canvas.toDataURL();
    baseImage.value.onload = () => {
      redrawCanvas(ctx);
    };
  } else {
    redrawCanvas(ctx);
  }
};

// Redraw the base image and add the watermark
const redrawCanvas = (ctx) => {
  ctx.clearRect(0, 0, props.canvas.width, props.canvas.height); // Clear the canvas
  ctx.drawImage(baseImage.value, 0, 0, props.canvas.width, props.canvas.height); // Redraw the base image

  if (watermarkType.value === 'image' && watermarkImage.value) {
    // Image watermark logic
    ctx.save();
    ctx.globalAlpha = opacity.value;

    const watermarkWidth = props.canvas.width / 3;
    const watermarkHeight =
      (watermarkImage.value.height / watermarkImage.value.width) * watermarkWidth;
    const x = (props.canvas.width - watermarkWidth) / 2;
    const y = (props.canvas.height - watermarkHeight) / 2;

    ctx.drawImage(watermarkImage.value, x, y, watermarkWidth, watermarkHeight);
    ctx.restore();
  } else if (watermarkType.value === 'text') {
    // Text watermark logic
    ctx.save();
    ctx.globalAlpha = opacity.value;
    ctx.font = `${fontSize.value}px "${selectedFont.value}"`;
    ctx.fillStyle = fontColor.value;
    ctx.textAlign = 'center';
    ctx.fillText(
      watermarkText.value,
      props.canvas.width / 2,
      props.canvas.height - 50
    );
    ctx.restore();
  }
};

// Fetch local fonts on component mount
onMounted(() => {
  fetchLocalFonts();
});
</script>
