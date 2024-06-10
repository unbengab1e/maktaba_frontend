<template>
  <div class="container" >
    <LongBookCard v-for="work in myWorks" @edit="$emit('edit')" :img-src="work.img"  :show-cover="isWide" :book-name="work.name" :reading-cnt="work.reading" :score="work.score"  :comment-cnt="work.judge" :is-creator="true" :is-popularize="work.popularized" :is-showing="true">

    </LongBookCard>
  </div>
</template>

<script setup>
import {getMyWorks} from "@/api/api.js";


import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import LongBookCard from "@/components/CreatorWorkCard.vue";
import Cookies from "js-cookie";
const myWorks = ref([])



let username = Cookies.get("username");
onMounted(async ()=>{
  let res = await getMyWorks(username);
  console.log(res);
  myWorks.value=res.data.message;
  console.log(myWorks.value);

});
const props=defineProps(['isWide', 'isNormal'])
</script>


<style>

</style>
