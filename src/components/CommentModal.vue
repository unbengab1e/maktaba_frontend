<template>
  <dialog id="comment" class="modal">
    <div class="modal-box bg-white z-50 drop-shadow-sm flex flex-col pt-4 border-t-2 max-w-full w-2/3">
      <span class="text-black text-4xl font-black mr-auto ml-[8%] my-[2.5%]">
        当前章节评论
      </span>
      <div class="container border-t-2"></div>
      <div class="container sticky bg-base-200 p-4 z-[80]" style="top:calc(100% - 80px)">
        <label class="input input-bordered flex items-center rounded-full">
          <input v-model="myComment" type="text" class="grow" placeholder="发下评论吧~" />
          <button class="badge badge-info h-4/5 my-[10%] -mr-[12px] rounded-full font-bold text-lg bg-sky-400"
            @click="doComment">发布</button>
        </label>
      </div>
      <div v-if="comments.length === 0" class="container py-4 h-80 bg-white flex justify-center">
        <h1 class="mt-16 text-2xl">
          还没有评论哦，快来发一条吧！
        </h1>
      </div>
      <div class="flex flex-col w-full h-auto -mt-16 mb-24">
        <CommentCard v-for="(comment, index) in comments" :key="index" :content="comment.content"
          :username="comment.username" class="m-3" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { getComment, postComment } from '@/api/api';
import CommentCard from './CommentCard.vue';
import { onMounted, ref, Ref, watch } from 'vue';
import { Comment } from '@/models/book';
import Cookies from 'js-cookie';
import { toast } from "vue3-toastify";

const name = Cookies.get('username')

const props = defineProps<{
  bid: number,
  chapter: number,
}>();
const comments: Ref<Comment[]> = ref([]);
const chapter = ref(props.chapter);
const myComment: Ref<string> = ref("");

onMounted(() => {
  getComment(props.bid, props.chapter).then((res) => {
    comments.value = res.data;
    console.log(comments.value)
  });
})

// watch(() => props.chapter, (new, old) => {
//   getComment(props.bid, props.chapter).then((res) => {
//     comments.value = res.data;
//     console.log(comments.value)
//   });
// });

async function doComment() {
  let res = await postComment(name, props.bid, props.chapter, myComment.value);
  console.log(res);
  myComment.value = ''
  comments.value = res.data
  if (res.status == 200) {
    toast.success('发布成功')
  }
}
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
}
</style>
