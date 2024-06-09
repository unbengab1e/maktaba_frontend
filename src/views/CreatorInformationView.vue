<template>
  <div class="container" >
    <LongBookCard v-for="work in myPopularized" @edit="$emit('edit')" :img-src="work.img" :show-cover="isWide" :book-name="work.name" :reading-cnt="work.reading" :score="work.score"  :comment-cnt="work.judge" :is-creator="true" :is-popularize="true" :is-showing="true">

    </LongBookCard>
  </div>
</template>

<script setup>
import {getDetail, getMyPopularizing, getMyWorks} from "@/api/api.js";


import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import LongBookCard from "@/components/CreatorWorkCard.vue";
import Cookies from "js-cookie";
const myPopularize = ref([])
const myPopularized = ref([])


let username = Cookies.get("username");
onMounted(async ()=>{
  let res = await getMyPopularizing('张三');
  console.log(res);
  myPopularize.value=res.data.data;

  console.log(Object.keys(myPopularize.value).length);
  for(let i=0;i<Object.keys(myPopularize.value).length;i++){
    let dres = await  getDetail('张三',myPopularize.value[i].book)
    myPopularized.value.push  (dres.data);
    console.log(dres);
  }
  console.log(Object.keys(myPopularized.value).length);
});
const props=defineProps(['isWide', 'isNormal'])
</script>


<style>

</style>
