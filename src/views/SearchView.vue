<template>
  <div class="container flex flex-wrap justify-around" >
    <NormalBookCard v-for="book in bookArray" @click="$emit('showDetailWindow',book['bid'])"  :img-src="book['img']" :book-name="book['name']" :book-author="book['author']" :book-tag="book['tag']" :reader-cnt="book['reading']" :book-score="book['score']" type="Praise" :book-reference="book['mess']">
    </NormalBookCard>
  </div>
</template>

<script setup>
import { ref,onMounted, onBeforeMount, computed,watch } from 'vue';
import NormalBookCard from '@/components/NormalBookCard.vue';
import { searchBook } from '@/api/api.js';
import { useRoute } from "vue-router";

const emit = defineEmits(['backHome', 'show'])
const bookArray = ref()
let route=useRoute()

function clickCard(param) {
  emit('show',param)
}

watch(route, async () => {
  console.log('触发')
  let res = await searchBook(route.query.q);
  console.log(res);
  bookArray.value = res.data.books;
})

emit('backHome')
onMounted(async () => {
  let res = await searchBook(route.query.q);
  console.log(route.query.q)
  console.log(res)
  bookArray.value = res.data.books;
})
</script>
