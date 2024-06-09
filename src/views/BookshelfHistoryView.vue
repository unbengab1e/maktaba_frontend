<template>
  <div class="w-full h-full flex flex-wrap ml-5 ">
    <NormalBookCard v-for="(book,index) in bookArray" :key="index" :imgSrc=book.imgSrc :bookName="book.bookName" :book-reference="book.bookReference" :is-read="book.isRead" class="m-4">

    </NormalBookCard>
  </div>
</template>
<script setup>
import NormalBookCard from "@/components/NormalBookCard.vue";
import {ref} from "vue";
const bookArray= ref([
  {imgSrc:'./shufen.jpg', bookName:'数学分析', bookReference:'工科数学分析',bookScore:'4',  bookClick:'' ,isRead:true},
  {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
  {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
  {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
  {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
  {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
  {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
  {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
])
</script>
<style>

</style>