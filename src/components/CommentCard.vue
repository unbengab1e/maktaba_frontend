<template>
  <div class="w-5/6 h-1/3 bg-pink-50 self-center rounded-2xl z-50 flex-col flex min-h-40 items-center">
    <span class="font-bold text-xl text-gray-600 mr-auto ml-[2%] mt-5">
      {{username}}
    </span>
    <span class="w-[96%] text-left overflow-hidden overflow-ellipsis break-normal break-words line-clamp-4 mt-5">
      {{content}}
    </span>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
  const props = defineProps(['content','username'])
</script>

<style>

</style>
