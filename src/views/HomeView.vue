<template>
  <div class="container flex flex-wrap justify-around" >
    <NormalBookCard v-for="book in bookArray" @click="$emit('showDetailWindow',book['bid'])"  :img-src="book['img']" :book-name="book['name']" :book-author="book['author']" :book-tag="book['tag']" :reader-cnt="book['reading']" :book-score="book['score']" :book-reference="book['mess']">
    </NormalBookCard>
  </div>
</template>

<script setup>
import { ref,onMounted, onBeforeMount,watch } from 'vue';
import NormalBookCard from '@/components/NormalBookCard.vue';
import { getRec } from '@/api/api.js';

const emit = defineEmits(['backHome', 'showDeatailWindow'])
const props=defineProps(['searchContent','doSearching'])
const bookArray = ref()
emit('backHome')

onMounted(async () => {
  let res = await getRec('张三','per');
  console.log(res);
  bookArray.value = res.data.data.books;
})

function doSearching(searchContent) {
  alert(searchContent)
}
</script>
