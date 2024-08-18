<template>
  <div class="w-5/6 bg-pink-50 self-center rounded-2xl z-50 flex-col flex min-h-40 p-4 my-4">
    <span class="font-bold text-2xl text-gray-600 mr-auto mt-2">
      {{username}}
    </span>
    <span class="w-[96%] text-left overflow-hidden overflow-ellipsis break-normal break-words line-clamp-4 mt-4">
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
