<template>
  <!-- 顶层容器 -->
    <div class="cont_modal cont_modal_active m-4 flex">
      <!-- 封面卡片 -->
      <div class="cont_photo " :class="{'w-[200px]':showCover,'w-10':!showCover}">
        <div class="cont_img_back bg-black">
          <img :src="imgSrc" alt="书籍封面" class="w-[200px] h-[280px] max-w-[1000px] hover:scale-[1.2]" >
        </div>
        <div v-if="showCover" class="cont_mins">
          <div class="sub_mins">
            <h1 class="mt-3 text-3xl text-center">{{bookRank+1}}</h1>
          </div>
        </div>
      </div>
      <!-- 文本卡片 -->
      <div class="cont_text_ingredients p-6 pl-8 " :class="{'ml-[190px]':showCover,'ml-[30px]':!showCover,'aaa':showCover,'bbb':!showCover}">
        <!-- 容器 -->
        <div class="w-full  flex flex-col justify-between">
          <!-- 标题 -->
          <div class="flex mb-4 overflow-hidden" :title="bookName">
            <span class="text-4xl bookHead text-left overflow-hidden overflow-ellipsis break-normal break-words line-clamp-1" >{{ bookName }}</span>
          </div>
          <!-- 指标 -->
          <div class="flex mb-2">
            <span class="text-xl text-gray-600">{{ 1}}字</span>

          </div>
          <!-- 指标 -->
          <div class="flex mb-2">
            <icon class="icon-[ant-design--read-outlined] my-auto"></icon>
            <span class="text-xl text-gray-600">{{ readingCnt }}</span>
            <span class="text-xl text-gray-600"></span>
            <icon class="icon-[material-symbols--comment-bank-outline] my-auto ml-[15px]"></icon>
            <span class="text-xl text-gray-600">{{ commentCnt }}</span>
            <span class="text-xl text-gray-600"></span>
            <icon v-if="!isShowing" class="icon-[whh--favoritealt] my-auto ml-[15px]"></icon>
            <span v-if="!isShowing" class="text-xl text-gray-600">{{ score }}</span>
            <span class="text-xl text-gray-600"></span>
          </div>
          <!-- 指标 -->
          <div v-if="!isShowing" class="flex mb-2 mt-[30px] ">
            <button v-if="!isCreator" class="gradient-blue  hover:drop-shadow-xl hover:shadow-md hover:bg-blue-600" >
              <icon class="icon-[whh--favoritealt] bg-white ml-[5px]"></icon>
              <span class="ml-[5px] text-white font-bold">加入书架</span>
            </button>
            <button v-if="!isCreator" class="gradient-green ml-[15px] hover:drop-shadow-xl shadow-md hover:bg-green-600">
              <icon class="icon-[ph--thumbs-up-bold] bg-white ml-[5px]"></icon>
              <span class="ml-[18px] text-white font-bold">点赞</span>
            </button>
            <button v-if="isCreator" class="gradient-red ml-[15px] hover:drop-shadow-xl shadow-md hover:bg-red-600">
              <icon class="icon-[material-symbols--delete-outline] bg-white ml-[5px]"></icon>
              <span class="ml-[18px] text-white font-bold">删除</span>
            </button>
            <button @click="$emit('edit',bid);" v-if="isCreator" class="gradient-blue ml-[15px] hover:drop-shadow-xl shadow-md hover:bg-blue-600">
              <icon class="icon-[material-symbols-light--edit-square-outline] bg-white ml-[5px]"></icon>
              <span class="ml-[18px] text-white font-bold">编辑</span>
            </button>
            <button @click="handlePopularize" v-if="!isPopularize" class="gradient-green ml-[15px] hover:drop-shadow-xl shadow-md hover:bg-green-600">
              <icon class="icon-[ep--promotion] bg-white ml-[5px]"></icon>
              <span class="ml-[18px] text-white font-bold">推广</span>
            </button>
            <div v-if="isPopularize" class="gradient-green ml-[15px] w-[100px] rounded-md shadow-md hover:bg-green-600 justify-center items-center flex">

              <span class="ml-[px] text-white font-bold">已推广</span>
            </div>
          </div>
          <div v-if="isShowing" class="flex mb-2 mt-[30px] ">
            <StarRating :value="score" :editable="false"></StarRating>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useFileSystemAccess } from '@vueuse/core'
import StarRating from "@/components/StarRating.vue";
import {bookRating, postPopularize} from "@/api/api.js";
import {toast} from "vue3-toastify";
const props = defineProps(['imgSrc', 'bookName','bookAuthor','bookScore','bookReference','bookRank','bookTag','readingCnt','score','commentCnt','showCover','isCreator','isPopularize','isShowing','bid']);
const bid = props.bid;
const bookTag = props.bookTag;
// const sendBid = () => {
//   // 在点击事件触发时，将 bid 传递给父组件
//   emit('targetBid', bid);
// };
async function handlePopularize(){
  let res = await postPopularize('张三', bid, "precise",bookTag);
   console.log(res);
  if (res.status == 200||res.status==201) {
    toast.success('评分成功')
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@200..900&display=swap');

.cont_modal {
  position: relative;
  height: 280px;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s; 
  transition-delay: 0.7s;
  -webkit-transition-delay: 0.7s;
  -o-transition-delay: 0.7s;
}

.cont_photo {
  position: absolute;
  height: 280px;
  overflow: hidden;
  background-color: #eee;
  border-radius:20px;
  float: left;
  z-index: 2;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  box-shadow: 1px 1px 20px -5px rgba(0,0,0,0.5);  
}

.cont_img_back {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius:20px ;
}
.cont_img_back > img {
opacity: 0.7;
-webkit-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s;
}

.cont_text_ingredients {
position: relative;
top: 10px;
  height: 260px;
  border-radius:5px ;
z-index: 3;
box-shadow: 1px 1px  20px  -5px  rgba(0,0,0,0.2);

  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#fbf9f9+28,e8eaed+100 */
background: rgb(251,249,249); /* Old browsers */
background: -moz-linear-gradient(-45deg,  rgba(251,249,249,1) 28%, rgba(232,234,237,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(-45deg,  rgba(251,249,249,1) 28%,rgba(232,234,237,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(135deg,  rgba(251,249,249,1) 28%,rgba(232,234,237,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
 
-webkit-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s; 
/* transition-delay: 0.7s; */
/* -webkit-transition-delay: 0.7s;
-o-transition-delay: 0.7s;
transition-delay: 0.7s; */
}

.cont_mins{
position: relative;
float: left;
width: 100%;
}

.sub_mins {
  position: relative;
  float: left;
  width: 60px;
  height: 60px;
  background-color: rgba(255,253,112,0.8);
border-radius:50% ;
margin: 16px;
margin-bottom: 0px;
opacity: 0;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  transition: all 0.5s;
transition-delay: 1s;
-webkit-transition-delay: 1s;
-o-transition-delay: 1s;
transition-delay: 1s;

}

.sub_mins > span {
  font-size: 9px; 
  font-weight: 700;
}
.cont_modal_active > .cont_text_ingredients{
z-index: 1;
box-shadow: 15px 20px  70px  -5px  rgba(0,0,0,0.2);
}
.cont_modal_active {
width: 100%;
}

.cont_modal_active > .cont_photo {
box-shadow: 25px 10px 70px -5px rgba(0,0,0,0.3);  
}

.cont_modal_active > .cont_photo > .cont_mins > .sub_mins {
  opacity: 1;
}

.cont_modal_active  > .cont_photo > .cont_servings {
  opacity: 1;
}

.bookHead{
  font-family: "Noto Serif SC", serif;
  font-weight: 700;
}
button{
  width: 100px;
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
.gradient-red {
  background: linear-gradient(to right, #ff6b6b, #f37c7c); /* 红色渐变 */
}

.gradient-blue {
  background: linear-gradient(to right, #458dcc, #898acd); /* 蓝色渐变 */
}

.gradient-green {
  background: linear-gradient(to right, #00b09b, #96c93d); /* 绿色渐变 */
}

.aaa{
  width: calc(100% - 220px);
}

.bbb{
  width: calc(100% - 60px);
}

</style>