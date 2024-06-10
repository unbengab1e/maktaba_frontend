<template>
  <div class="w-full h-full flex flex-wrap ml-5 ">
    <NormalBookCard v-for="book in books"  :img-src="book.img" :book-name="book.name" :book-reference="book.bookReference" :book-author="book.author" :book-score="book.score" :book-tag="book.tag" :is-read="book.isRead" class="m-4">

    </NormalBookCard>
  </div>
</template>
<script setup>
import NormalBookCard from "@/components/NormalBookCard.vue";
import {onMounted, ref} from "vue";
import Cookies from "js-cookie";
import {getDetail, getMyCollect} from "@/api/api.js";
const bookArray = ref([])
const books = ref([])
let username = Cookies.get("username");
onMounted(async () => {
  let res = await getMyCollect('1', 'order_by_like')
  console.log(res);
  bookArray.value = res.data.result;
  for (let i = 0; i < bookArray.value.length; i++) {
    console.log(bookArray.value[i].bid);
    let dres = await getDetail('张三', bookArray.value[i].bid);
    console.log(dres);
    books.value.push(dres.data)
  }
  //console.log(books.value.length)
})


</script>
<style>

</style>