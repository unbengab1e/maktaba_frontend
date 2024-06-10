<template>
  <div class="w-screen flex justify-center items-center" style="height: calc(100vh - 100px);">
    <button @click="$emit('beCreator')" class="w-[400px] h-[160px] z-50 rounded-2xl my-auto " id="btn">
      <span class="hhh text-2xl">
        成为创作者
      </span>
    </button>
  </div>
</template>
<style scoped>

</style>

<script setup>
import {onMounted} from "vue";
import {getDetail, getIsAuthor, getMyCollect} from "@/api/api.js";


</script>

<style scoped>
.image-container {
  width: 300px; /* 设置 div 宽度 */
  height: 200px; /* 设置 div 高度 */
  background-size: cover; /* 背景图片将被缩放以完全覆盖 div */
  background-position: center; /* 背景图片在 div 中的位置 */
}
button {
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: none;
  background: transparent;
  cursor: pointer;
  box-shadow: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: 0.5s ease;
  user-select: none;
}

#btn:hover,
:focus {
  color: #ffffff;
  background: #008cff;
  border: 1px solid #008cff;
  text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
  box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff,
  0 0 100px #008cff;
}

</style>
