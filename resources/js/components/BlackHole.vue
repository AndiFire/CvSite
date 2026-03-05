   <template>
   <div id="space-bg" class="bg-black fixed inset-0 -z-10"></div>
   </template>

   <script setup>
   import { onMounted } from "vue"
   import * as THREE from "three"

   onMounted(() => {

   const scene = new THREE.Scene()

   const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
   )

   const renderer = new THREE.WebGLRenderer({ alpha: true })
   renderer.setSize(window.innerWidth, window.innerHeight)

   document.getElementById("space-bg").appendChild(renderer.domElement)

   camera.position.z = 30

   const starGeometry = new THREE.BufferGeometry()
   const starCount = 2000

   const positions = new Float32Array(starCount * 3)

   for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2000
   }

   starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
   )

   const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1
   })

   const stars = new THREE.Points(starGeometry, starMaterial)
   scene.add(stars)


   const blackHole = new THREE.Mesh(
      new THREE.SphereGeometry(5, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
   )

   scene.add(blackHole)

   const diskGeometry = new THREE.RingGeometry(6, 12, 128)
   const diskMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6

   })

   const disk = new THREE.Mesh(diskGeometry, diskMaterial)
   disk.rotation.x = 2
   disk.rotation.y = 3.5
   disk.rotation.z = 3.5


   scene.add(disk)

   const mouse = { x: 0, y: 0 }
   window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5
      mouse.y = (e.clientY / window.innerHeight) - 0.5
   })


   function animate() {
      requestAnimationFrame(animate)

      stars.rotation.y += 0.0005 + mouse.x * 0.002
      stars.rotation.x += mouse.y * 0.001

      disk.rotation.y += 0.0001
      disk.rotation.x += 0.0001

      renderer.render(scene, camera)
   }

   animate()

   window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
   })

   })
   </script>