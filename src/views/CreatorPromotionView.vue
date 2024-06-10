<template>
  <div class="flex-col w-full h-auto">
    <div class="container h-auto" >
      <LongBookCard v-for="work in myWorks" @edit="doEdit" :img-src="work.img"  :book-tag="work.tag" :show-cover="isWide" :book-name="work.name" :reading-cnt="work.reading" :score="work.score"  :comment-cnt="work.judge" :is-creator="true" :is-popularize="work.popularized" :is-showing="false" :bid="work.bid">

      </LongBookCard>
    </div>
    <button @click="$emit('create')" class="w-[97%] bg-gray-200 bg-opacity-50 flex justify-center items-center mx-auto hover:shadow-md ">
      <icon class="icon-[material-symbols--add-circle-outline-rounded] text-black bg-gray-400 bg-opacity-50 scale-[200%] hover:scale-[220%]"></icon>
      <!-- 可选的文本 -->
      <!-- <span class="ml-[18px] text-black font-bold">添加</span> -->
    </button>


  </div>

</template>

<script setup>
import {getMyWorks} from "@/api/api.js";


import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import LongBookCard from "@/components/CreatorWorkCard.vue";
import Cookies from "js-cookie";
const myWorks = ref([])
const emit=defineEmits(['edit'])

function doEdit(param){
  emit('edit',param);
}


let username = Cookies.get("username");
onMounted(() => {
  fetchData(); // 初始获取数据
  setInterval(fetchData, 5000); // 每隔5秒更新一次数据
});

async function fetchData() {
  try {
    const res = await getMyWorks(username);
    console.log(res);
    myWorks.value = res.data.message;
    console.log(myWorks.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const props=defineProps(['isWide', 'isNormal'])
</script>


<style scoped>
button{
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  position: relative;
  outline: none;
  border: 0;

}
button:before {
  content: ''; /* 添加伪元素的内容 */
  display: block; /* 将伪元素设为块级元素 */
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
  /* 设置伪元素的背景为渐变色，透明度从0到0.4，从右向左 */
  background-size: 210% 100%; /* 设置背景尺寸为 210% * 100% */
  background-position: right bottom; /* 设置背景起始位置为右下角 */
  height: 100%; /* 设置伪元素高度为100% */
  width: 100%; /* 设置伪元素宽度为100% */
  position: absolute; /* 将伪元素设为绝对定位，相对于父元素定位 */
  top: 0; /* 从顶部开始 */
  bottom: 0; /* 到底部结束 */
  right: 0; /* 靠右侧 */
  left: 0; /* 靠左侧 */
  border-radius: 5px; /* 设置伪元素圆角 */
  transition: 0.5s; /* 设置伪元素的过渡效果，持续时间为1秒 */
}
button:active:before{
  transition: all 0.1s;
  background-position: left bottom;
}
</style>
