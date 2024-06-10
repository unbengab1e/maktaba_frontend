<template>
  <div class="w-full flex-col h-auto flex">
    <CommentCard v-for="(comment,index) in comments" :key="index" :content="comment.content" :username="comment.bookname" class="m-3">

    </CommentCard>
  </div>

</template>

<script setup>

import CommentCard from "@/components/CommentCard.vue";
import {onMounted, ref} from "vue";
import {getDetail, getMyComment} from "@/api/api.js";
import Cookies from "js-cookie";
const comments = ref([]);
const username = Cookies.get("username");
onMounted(async ()=>{
  let res = await getMyComment(username)
  console.log(res)
  comments.value = res.data.data;
  for(let i = 0; i < comments.value.length; i++) {
    if(comments.value[i].chapter=='all'){

    }
    else{
      comments.value[i].bookname=comments.value[i].bookname+' 第'+comments.value[i].chapter+'章';
    }
  }

});

</script>

<style scoped>

</style>