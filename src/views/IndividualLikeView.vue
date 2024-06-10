<template>
  <div class="container" >
    <LongBookCard v-for="work in myRateBooks" @edit="$emit('edit')" :img-src="work.img"  :show-cover="isWide" :book-name="work.name" :reading-cnt="work.reading" :score="work.score"  :comment-cnt="work.judge" :is-creator="true" :is-popularize="work.popularized" :is-showing="true">

    </LongBookCard>
  </div>
</template>

<script setup>
import {getDetail, getMyRating, getMyWorks} from "@/api/api.js";


import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import LongBookCard from "@/components/CreatorWorkCard.vue";
import Cookies from "js-cookie";
const myWorks = ref([])
const myRateBooks = ref ([])
const temp = ref([]);

let username = Cookies.get("username");
onMounted(async ()=>{
  let res = await getMyRating('张三');
  console.log(res);
  myWorks.value=res.data.data;
  for(let i = 0; i < myWorks.value.length; i++) {
    console.log(myWorks.value[i].bid);
    let dres = await getDetail('张三', myWorks.value[i].bid);
    console.log(dres);
    temp.value=dres.data;
    temp.value.score=myWorks.value[i].rate*2;
    myRateBooks.value.push(temp.value)
    console.log(myRateBooks.value);

  }

});
const props=defineProps(['isWide', 'isNormal'])
</script>


<style>

</style>
