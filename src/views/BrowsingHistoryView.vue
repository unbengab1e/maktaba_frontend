<template>
  <div class="h-auto w-full flex-col">
    <div class="w-full h-[10%] flex mt-3.5 ml-10">
      <h1 class="text-2xl font-black">
        浏览历史
      </h1>
    </div>
    <div class="h-[1px] w-full bg-gray-200 mt-2" >
    </div>
    <div class="w-full h-full flex flex-wrap ml-5">
      <NormalBookCard v-for="(book,index) in bookArray" @click="$emit('show',book['bid'])"  :img-src="book['img']" :book-name="book['name']" :book-author="book['author']" :book-tag="book['tag']" :reader-cnt="book['reading']" :book-score="book['score']" type="Praise" class="m-4">

      </NormalBookCard>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import {getBrowsingHistory} from "@/api/api.js";

const emit=defineEmits(['leaveHome'])
const bookArray= ref([
])
onMounted(async ()=> {
  let res = await getBrowsingHistory('张三');
  console.log(res);
  bookArray.value = res.data;
  console.log(bookArray.value);
})

emit('leaveHome')
</script>


<style>

</style>
