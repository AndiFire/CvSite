<template>
   <div class="min-h-screen flex items-center justify-center px-4 py-8">
      <div class="flip-scene">
         <div :class="['flip-card', { 'is-flipped': isFlipped }]">

            <!-- FRONT SIDE------------------------------------------------------------------------------ -->
            <div class="flip-face flip-card-front bg-white/20 rounded-2xl shadow-xl flex justify-between">


               <!-- TEXT OF FRONT--------------------------------------------- -->
               <div class="flex-col flex w-full md:w-3/5 justify-center p-6 md:px-16 md:pr-2">

                  <div class="mb-10">
                     <h2 class="text-3xl font-bold ">Hi, I'm</h2>
                     <h1 class="text-5xl font-bold ">Andrey Didyk</h1>
                     <h3 class="text-xl mb-6 font-bold">And I am Fullstack Web Developer</h3>
                     <p class="">My skills for now are on Junior level. I was intrested in programming since i was 13 y.o. I
                        was learning python back then, but now my stack has changed a lot.</p>
                  </div>

                  <div class="flex gap-8">
                     <ul>
                        <li>
                           <h4 class="text-lg font-bold">BackEnd</h4>
                        </li>
                        <li class="flex items-center gap-x-1"><img class="w-4 h-4" :src="iconPaths.laravel">
                           <p>Laravel</p>
                        </li>
                        <li class="flex items-center gap-x-1"><img class="w-4 h-4" :src="iconPaths.php">
                           <p>PHP</p>
                        </li>
                        <li class="flex items-center gap-x-1"><img class="w-4 h-4" :src="iconPaths.mysql">
                           <p>Mysql</p>
                        </li>
                     </ul>
                     <ul>
                        <li>
                           <h4 class="text-lg font-bold">FrontEnd</h4>
                        </li>
                        <li class="flex items-center gap-x-1"><img class="w-4 h-4" :src="iconPaths.vue">
                           <p>Vue</p>
                        </li>
                        <li class="flex items-center gap-x-1"><img class="w-4 h-4" :src="iconPaths.javascript">
                           <p>JavaScript</p>
                        </li>
                        <li class="flex items-center gap-x-1"><img class="w-4 h-4" :src="iconPaths.tailwind">
                           <p>Tailwind</p>
                        </li>
                     </ul>

                  </div>

               </div>

               <!-- MY IMAGE-------------------------------------- -->
               <div class="hidden md:flex flex-col w-2/5 justify-center px-6 lg:px-12">
                  <div class="">
                     <img :src="portraitPath" alt="Portrait of Andrey Didyk">
                  </div>
               </div>

               <button
                  @click="toggleFlip"
                  class="absolute top-0 right-0 px-4 py-4 text-sm font-semibold text-slate-900 bg-white/60 focus:outline-none border-l border-b rounded-bl-2xl rounded-tr-2xl cursor-pointer">
                  flip
               </button>
            </div>

            <!-- BACK SIDE---------------------------------------------------------------------------------------- -->
            <div class="flip-face flip-card-back bg-white/20 rounded-2xl shadow-xl flex justify-between">
               <div class="flex flex-col justify-center w-full md:w-3/5 p-6 md:px-16 md:pr-2">
                  <h2 class="text-3xl font-bold mb-6">About Me</h2>
                  <p class="text-base leading-7 mb-4">
                     I'm 18 years young. I was born in Ukraine and moved to poland when I was 9. Since then, I was looking form some hobbies and 4 years later discovered programming.  
                  </p>
                  <p class="text-base leading-7 mb-4">
                     I enjoy building fullstack web applications, learning modern tools, and improving both backend logic and frontend interfaces.
                  </p>

                  <p class="text-base leading-7 mb-8">
                     Right now I am focused on Laravel, Vue, Tailwind, and writing cleaner code with better user experience.
                  </p>
                  <p class="text-lg font-bold leading-7 mb-4 text-red-500">
                     You can also checkout my projects:
                  </p>
                  <div class="flex flex-wrap gap-3">
                     <span class="px-3 py-1 rounded-full bg-white/20">Todoist</span>
                     <span class="px-3 py-1 rounded-full bg-white/20">Diary</span>
                  </div>
               </div>

               <div class="hidden md:flex flex-col w-2/5 justify-center px-6 lg:px-12">
                  <div class="">
                     <img :src="portraitPath" alt="Portrait of Andrey Didyk">
                  </div>
               </div>

               <button
                  @click="toggleFlip"
                  class="absolute top-0 right-0 px-4 py-4 text-sm font-semibold text-slate-900 bg-white/60 focus:outline-none border-l border-b rounded-bl-2xl rounded-tr-2xl cursor-pointer">
                  flip
               </button>
            </div>
         </div>
      </div>
   </div>
</template>



<script setup>
import { ref } from 'vue'

const isFlipped = ref(false)
const portraitPath = '/images/me-removebg.png'
const iconPaths = {
   laravel: '/icons/Laravel.svg',
   php: '/icons/PHP.svg',
   mysql: '/icons/MySQL.svg',
   vue: '/icons/Vue.svg',
   javascript: '/icons/JavaScript.svg',
   tailwind: '/icons/Tailwind.svg',
}

function toggleFlip() {
   isFlipped.value = !isFlipped.value
}
</script>

<style scoped>
.flip-scene {
   width: min(100%, 1100px);
   height: min(70vh, 640px);
   perspective: 1800px;
}

.flip-card {
   position: relative;
   width: 100%;
   height: 100%;
   transform-style: preserve-3d;
   transition: transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
}

.flip-card.is-flipped {
   transform: rotate3d(1, 1, 0, 180deg);
}

.flip-face {
   position: absolute;
   inset: 0;
   backface-visibility: hidden;
   transform-style: preserve-3d;
   overflow: hidden;
   border: 1px solid rgba(255, 255, 255, 0.18);
}

.flip-card-front {
   transform: rotate3d(0, 0, 0, 0deg);
}

.flip-card-back {
   transform: rotate3d(1, 1, 0, 180deg);
}

img {
   max-width: 100%;
   height: auto;
   object-fit: contain;
}

@media (max-width: 767px) {
   .flip-scene {
      height: 560px;
   }

   .flip-face {
      padding-top: 1rem;
   }
}
</style>
