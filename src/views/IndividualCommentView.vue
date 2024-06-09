

<template>
  <div class="w-full flex-col h-auto flex">
    <CommentCard v-for="comment in comments"  :comment="comment.content" :username="comment.username" class="m-3 mx-auto"/>
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