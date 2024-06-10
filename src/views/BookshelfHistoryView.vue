<template>
  <div class="w-full h-full flex flex-wrap ml-5 justify-around">
    <NormalBookCard v-for="book in books"   :img-src="book.img" :book-name="book.name" :book-reference="book.mess" :book-author="book.author" :book-score="book.score" :book-tag="book.tag" :is-read="book.isRead" class="m-4" @click="jump(book)">

    </NormalBookCard>
  </div>
</template>
<script setup>
import NormalBookCard from "@/components/NormalBookCard.vue";
import {onMounted, ref} from "vue";
import Cookies from "js-cookie";
import {getDetail, getMyCollect, getReadingProcess} from "@/api/api.js";
const bookArray = ref([])
const books = ref([])
const booksCopy = ref([])
const tempCopy = ref();
let username = Cookies.get("username");
let userid = Cookies.get("user_id")
onMounted(async () => {
  let res = await getMyCollect(userid, 'order_by_update_time')
  console.log(res);
  bookArray.value = res.data.result;
  for (let i = 0; i < bookArray.value.length; i++) {
    console.log(bookArray.value[i].bid);
    let dres = await getDetail(username, bookArray.value[i].bid);
    console.log(dres);
    let rres = await getReadingProcess(userid,bookArray.value[i].bid);
    console.log(rres)
    tempCopy.value = dres.data
    tempCopy.value.author = rres.data.message
    booksCopy.value.push(tempCopy.value)

  }
  books.value=booksCopy.value
  //console.log(books.value.length)
})

function jump(book) {
  window.location.replace('/reader/?bookName='+book['name']+'&bid='+book['bid']+'&chapter=1&offset=0')
}

</script>
<style>

</style>