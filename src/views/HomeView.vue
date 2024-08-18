<template>
  <div v-if="!isReady" class="container flex flex-wrap justify-around">
    <NormalBookCardSkeleton v-for="i in 40"></NormalBookCardSkeleton>
  </div>
  <div v-if="isReady" class="container flex flex-wrap justify-around" >
    <NormalBookCard v-for="book in bookArray" @click="$emit('showDetailWindow',book['bid'])"  :img-src="book['img']" :book-name="book['name']" :book-author="book['author']" :book-tag="book['tag']" :reader-cnt="book['reading']" :book-score="book['score']" :book-reference="book['mess']">
    </NormalBookCard>
  </div>
</template>

<script setup>
import { ref,onMounted, onBeforeMount,watch,computed } from 'vue';
import NormalBookCard from '@/components/NormalBookCard.vue';
import { getRec } from '@/api/api.js';
import Cookies from "js-cookie";
import NormalBookCardSkeleton from '@/components/NormalBookCardSkeleton.vue';

const emit = defineEmits(['backHome', 'showDeatailWindow'])
const props=defineProps(['searchContent','doSearching','changeUserName'])
const bookArray = ref()
const username = ref(Cookies.get('username'))
const isReady=ref(false)
emit('backHome')

const changeUserName = computed(() => props.changeUserName)
watch(changeUserName, async() => {
  username.value = Cookies.get('username')
    let res = await getRec(username.value,'per');
  console.log(res);
  bookArray.value = res.data.data.books;
})

onMounted(async () => {
  let res = await getRec(username.value,'per');
  console.log(res);
  bookArray.value = res.data.data.books;
  isReady.value=true
})

function doSearching(searchContent) {
  alert(searchContent)
}
</script>
