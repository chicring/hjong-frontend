<template>
  <div>
    <canvas ref="canvas1"></canvas>
    <div>
      <canvas ref="canvas2"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const canvas1 = ref(null);
const canvas2 = ref(null);
const amplitude = 50;
const wavelength = 1200;
const yOffset = window.innerHeight / 1.1;
let time1 = 0;
let time2 = 1.3;
const timeIncrement = 0.02;

function draw() {
  const ctx1 = canvas1.value.getContext('2d');
  const ctx2 = canvas2.value.getContext('2d');

  ctx1.clearRect(0, 0, canvas1.value.width, canvas1.value.height);
  ctx2.clearRect(0, 0, canvas2.value.width, canvas2.value.height);

  ctx1.beginPath();
  ctx1.moveTo(0, canvas1.value.height);
  for (let x = 0; x < canvas1.value.width; x++) {
    const noise = getNoise(x, time1);
    const y = amplitude * Math.sin((2 * Math.PI * x) / wavelength + time1) + yOffset + noise;
    ctx1.lineTo(x, y);
  }
  ctx1.lineTo(canvas1.value.width, canvas1.value.height);
  ctx1.closePath();

  ctx1.fillStyle = ' rgba(56, 146, 250, 0.8)';
  ctx1.fill();

  ctx2.beginPath();
  ctx2.moveTo(0, canvas2.value.height);
  for (let x = 0; x < canvas2.value.width; x++) {
    const noise = getNoise(x, time2);
    const y = amplitude * Math.sin((2 * Math.PI * x) / wavelength + time2) + yOffset + noise;
    ctx2.lineTo(x, y);
  }
  ctx2.lineTo(canvas2.value.width, canvas2.value.height);
  ctx2.closePath();

  ctx2.fillStyle = 'rgba(55, 146, 251, 0.6)';
  ctx2.fill();

  time1 += timeIncrement;
  time2 += timeIncrement;

  requestAnimationFrame(draw);
}

function getNoise(x, t) {
  return (Math.sin(x / wavelength + t) + Math.sin(x / (wavelength * 0.5) + t)) * amplitude * 0.5;
}

onMounted(() => {
  canvas1.value.width = canvas2.value.width = window.innerWidth;
  canvas1.value.height = canvas2.value.height = window.innerHeight;
  draw();
});
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0.7;
}

div {
  opacity: 0.8;
}
</style>
