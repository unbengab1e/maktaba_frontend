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
const comments = ref([]);
onMounted(async ()=>{
  let res = await getMyComment('张三')
  console.log(res)
  comments.value = res.data.data;


});

</script>

<style scoped>

</style>