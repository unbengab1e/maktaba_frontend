<template>
  <div ref="windowBlur" class="transition-all duration-300 ease-in-out fixed w-screen h-screen flex-col flex justify-center items-center z-50" @click="hideWindow()" @scroll.stop>
    <div class="absolute bg-black opacity-30 w-full h-full">

    </div>
    <div ref="bkdtwd" class="transition-all duration-300 ease-in-out window fixed flex flex-col w-[768px] h-[70%] shadow-lg overflow-hidden rounded-2xl opacity-0 " @click.stop>
      <LoginInCard @signInSuccess="$emit('signInSuccess')" class="w-full h-full ml-auto my-auto"></LoginInCard>
    </div>

  </div>
</template>

<script setup>
import { ref,onMounted, nextTick } from 'vue'
import CommentCard from "../components/CommentCard.vue";
import StarRating from "../components/StarRating.vue";
import { getDetail,getComment } from '@/api/api.js';
import LoginInCard from "@/components/LoginInCard.vue";
const props = defineProps(['bid'])

const emit = defineEmits(['closeLoginWindow'])
const bkdtwd = ref(null)
const windowBlur=ref(null)
const bookInfo = ref({
  name: '工科数学分析',
  // cover: '../assests/books/shufen.jpg',
  cover:'./shufen.jpg',
  author: '孙玉泉',
  tags: ['数学','国家精品课程','睡前读物','玄幻'],
  brief: 'sb数分',
  rank:'90'
})
const comments = [
  {username:'用户名称',content:'bkdtwdbkdtwdbkdtwdbkdtwdbkdtwdbkdtwd'},
  {username:'用户名称',content:'bbbbbbbbbbbbbbbbbb'},
  {username:'用户名称',content:'cccccccccccccccccc'},
  {username:'用户名称',content:'cccccccccccccccccc'},
];

onMounted(async () => {
  nextTick(() => {
    windowBlur.value.classList.add('backdrop-blur-sm')
    bkdtwd.value.classList.remove("opacity-0")
    bkdtwd.value.classList.remove("translate-y-60")
  })
})

function hideWindow() {
  bkdtwd.value.classList.add("opacity-0")
  bkdtwd.value.classList.add("translate-y-60")
  // windowBlur.value.classList.add('backdrop-blur-none')
  windowBlur.value.classList.remove('backdrop-blur-sm')
  setTimeout(() => {
    emit('closeLoginWindow')
  },300)
}

setTimeout(()=> {
  windowBlur.value.classList.add('backdrop-blur-sm')
  bkdtwd.value.classList.remove("opacity-0")
  bkdtwd.value.classList.remove("translate-y-60")
}, 10)

</script>

<style scoped>
.window::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>