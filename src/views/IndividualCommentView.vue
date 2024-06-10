<template>
  <div class="w-full flex-col h-auto flex">
    <CommentCard v-for="(comment,index) in comments" :key="index" :content="comment.content" :username="comment.username" class="m-3">

    </CommentCard>
  </div>

</template>

<script setup>

import CommentCard from "@/components/CommentCard.vue";
import {ref} from "vue";
const comments = ref([
  {
    content :"a",
    username :"a",
  },
  {
    content :"ab",
    username :"ab",
  },
  {
    content :"abc",
    username :"abc",
  },
])
</script>

<style scoped>

</style>