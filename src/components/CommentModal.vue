<template>
  <dialog id="comment" class="modal">
    <div class="modal-box">
      <h1>当前章节评论</h1>
      <CommentCard v-for="i in 10" />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import CommentCard from './CommentCard.vue';


</script>

<style scoped lang="scss">
.modal-box {
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: black;

  &::-webkit-scrollbar {
    display: none;
  }

  &>div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
