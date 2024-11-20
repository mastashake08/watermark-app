<template>
  <div class="relative w-full">
    <input
      type="file"
      @change="handleUpload"
      accept="image/*"
      class="mb-4 block mx-auto w-full max-w-md p-2 border rounded-md"
    />
    <div class="canvas-container relative mx-auto">
      <canvas ref="canvas" class="w-full max-w-full border rounded-md"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const canvas = ref(null);
const image = ref(null); // Store the uploaded base image
const aspectRatio = ref(1); // Aspect ratio of the image
const containerWidth = ref(600); // Default container width

// Emit the canvas to the parent
const emit = defineEmits(['updateCanvas']);

// Handle image upload
const handleUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    image.value = new Image();
    image.value.onload = async () => {
      aspectRatio.value = image.value.width / image.value.height;

      await nextTick();
      resizeCanvas();
    };
    image.value.src = reader.result;
  };
  reader.readAsDataURL(file);
};

// Resize the canvas while maintaining the aspect ratio
const resizeCanvas = () => {
  if (!canvas.value || !image.value) return;

  const ctx = canvas.value.getContext('2d');

  const container = canvas.value.parentNode;
  containerWidth.value = container.offsetWidth;

  const canvasHeight = containerWidth.value / aspectRatio.value;
  canvas.value.width = containerWidth.value;
  canvas.value.height = canvasHeight;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.drawImage(image.value, 0, 0, canvas.value.width, canvas.value.height);

  // Emit the updated canvas to the parent
  emit('updateCanvas', canvas.value);
};

// Resize the canvas when mounted or resized
onMounted(() => {
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
});
</script>

<style scoped>
.canvas-container {
  max-width: 100%; /* Make the canvas container responsive */
}
canvas {
  display: block;
  max-width: 100%; /* Make the canvas responsive */
  height: auto; /* Maintain aspect ratio */
}
</style>
