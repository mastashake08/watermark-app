<template>
  <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg">
    <!-- How-To Section -->
    <div class="how-to bg-gray-100 p-6 mb-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">How to Use:</h2>
      <ul class="list-disc pl-6 text-gray-600">
        <li>Upload your base image first.</li>
        <li>Choose a watermark type: text or image.</li>
        <li>Customize your watermark's appearance.</li>
        <li>The canvas will scale to fit your screen.</li>
        <li>Export your final image using the export button.</li>
      </ul>
    </div>

    <!-- Google Ad -->
    <div class="ad-container my-4">
      <adsbygoogle
        style="display:block"
        data-ad-slot="4848045761"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></adsbygoogle>
    </div>

    <!-- Watermark Creator -->
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Watermark Creator</h1>
    <UploadImage @updateCanvas="updateCanvas" />
    <div v-if="canvas" class="mt-6">
      <WatermarkControls :canvas="canvas" />
    </div>
    <div v-if="canvas" class="mt-6 text-center">
      <ExportButton :canvas="canvas" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const canvas = ref(null);

const updateCanvas = (updatedCanvas) => {
  canvas.value = updatedCanvas;
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.ad-container {
  text-align: center;
}
</style>
