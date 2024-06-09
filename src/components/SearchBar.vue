<template>
    <div class="flex justify-center mx-20 lg:mx-60 md:mx-40 h-20 mt-60 sticky top-4 z-50">
        <div ref="sb" class="transition-all ease-in-out sticky flex top-0 shadow-md w-full h-[52px] border-2 rounded-full focus-within:shadow-2xl focus-within:border-blue-500 focus-within:shadow-blue-400">
            <input type="text" class="h-full w-full outline-none rounded-full pl-8" placeholder="请输入搜索内容">
            <i class="icon-[material-symbols--search] w-8 h-8 my-auto mr-4"></i>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
const sb = ref(null)
onMounted(() => {
    console.log(sb.value)
})
window.addEventListener('scroll', () => {
    const sbPosition = sb.value.getBoundingClientRect().top
    if (sbPosition <= 40) {
        sb.value.classList.add('mx-10')
    } else {
        sb.value.classList.remove('mx-10')
    }
})
</script>