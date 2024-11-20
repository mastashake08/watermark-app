<template>
    <div class="flex justify-center mt-4">
      <button @click="exportImage" class="p-2 bg-green-500 text-white">
        Export Image
      </button>
    </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    canvas: {
      type: Object,
      required: true,
    },
  });
  
  const exportImage = () => {
    const link = document.createElement('a');
    link.download = 'watermarked-image.png';
    link.href = props.canvas.toDataURL();
    link.click();
  };
  </script>
  