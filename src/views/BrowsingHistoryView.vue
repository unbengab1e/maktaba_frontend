<template>
  <div class="h-auto w-full flex-col">
    <div class="w-full h-[10%] flex mt-3.5 ml-10">
      <h1 class="text-2xl font-black">
        浏览历史
      </h1>
    </div>
    <div class="h-[1px] w-full bg-gray-200 mt-2" >
    </div>
    <div class="container w-full h-full flex flex-wrap ">
      <NormalBookCard v-for="(book,index) in bookArray" @click="$emit('show',book['bid']);jump(book['name'],book['bid'])"  :book-reference="book['mess']" :img-src="book['img']" :book-name="book['name']" :book-author="book['author']" :book-tag="book['tag']" :reader-cnt="book['reading']" :book-score="book['score']" type="Praise" class="m-4 max-h-[350px]" >

      </NormalBookCard>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import {getBrowsingHistory, getDetail, getReadingProcess} from "@/api/api.js";
import Cookies from "js-cookie";

const emit=defineEmits(['leaveHome'])
const bookArray= ref([
])
const username = Cookies.get('username')
const userid = Cookies.get('user_id')
const tempCopy = ref();
onMounted(async ()=> {
  let res = await getBrowsingHistory(username);
  console.log(res);
  bookArray.value = res.data.data;
  for(let i=0;i<bookArray.value.length;i++)
  {
    let rres = await getReadingProcess(userid,bookArray.value[i].bid);
    if(rres.data.message==="还未阅读过本书"){
      bookArray.value[i].author = rres.data.message
    }else{
      bookArray.value[i].author = "已阅读到第"+rres.data.message[0].chapter+"章"
    }

    let dres = await getDetail(username,bookArray.value[i].bid);
    bookArray.value[i].mess = dres.data.mess;
  }


})
function jump(name,bid) {
  window.location.replace('/reader/?bookName='+name+'&bid='+bid+'&chapter=1&offset=0')
}
emit('leaveHome')
</script>


<style>

</style>
