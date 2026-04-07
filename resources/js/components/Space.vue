<template>
   <!-- <video autoplay loop muted playsinline class="fixed inset-0 w-full h-full object-cover -z-10">
      <source src="/public/videos/blackhole.mp4" type="video/mp4">
   </video> -->
   <div ref="container" class="fixed inset-0 z-0 pointer-events-none"></div>
</template>

<script setup>
   import { onMounted, onBeforeUnmount, ref } from "vue";
   import * as THREE from "three";

   const container = ref();

   let renderer, scene, camera, starMesh;
   let animationId;

   let mouse = { x: 0, y: 0 };
   let starPositions;

   function createBackground() {
   const geometry = new THREE.BufferGeometry();

   const count = 2000;
   starPositions = new Float32Array(count * 3);

   for (let i = 0; i < count; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
   }

   geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
   );

   // круглая звездная текстура
   const canvas = document.createElement("canvas");
   canvas.width = 64;
   canvas.height = 64;

   const ctx = canvas.getContext("2d");

   const gradient = ctx.createRadialGradient(
      32, 32, 0,
      32, 32, 32
   );

   gradient.addColorStop(0, "white");
   gradient.addColorStop(1, "transparent");

   ctx.fillStyle = gradient;
   ctx.fillRect(0, 0, 64, 64);

   const texture = new THREE.CanvasTexture(canvas);

   const material = new THREE.PointsMaterial({
      size: 0.8,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
   });

   return new THREE.Points(geometry, material);
   }


   function animate() {
   animationId = requestAnimationFrame(animate);

   starMesh.rotation.y += 0.0004;

   const positions = starMesh.geometry.attributes.position.array;

   for (let i = 0; i < positions.length; i += 3) {
      const dx = positions[i] - mouse.x * 40;
      const dy = positions[i + 1] - mouse.y * 40;

      const dist = Math.sqrt(dx * dx + dy * dy);

      const force = Math.max(0, 1 - dist / 30);

      positions[i] += dx * force * 0.002;
      positions[i + 1] += dy * force * 0.002;
   }

   starMesh.geometry.attributes.position.needsUpdate = true;

   renderer.render(scene, camera);
   }


   onMounted(() => {
   const el = container.value;

   scene = new THREE.Scene();

   camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      500
   );

   camera.position.z = 50;

   renderer = new THREE.WebGLRenderer({
      antialias: true,
      // alpha: true
   });

   // renderer.setClearColor(0x000000, 0);
   renderer.setSize(window.innerWidth, window.innerHeight);
   el.appendChild(renderer.domElement);

   starMesh = createBackground();
   scene.add(starMesh);

   window.addEventListener("mousemove", e => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
   });

   window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
   });

   animate();
   });

   onBeforeUnmount(() => {
   cancelAnimationFrame(animationId);
   });
</script>

