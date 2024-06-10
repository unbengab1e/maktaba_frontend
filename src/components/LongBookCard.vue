<template>
  <!-- 顶层容器 -->
    <div class="cont_modal cont_modal_active m-4 flex ">
      <!-- 封面卡片 -->
      <div class="cont_photo cursor-pointer" :class="{'w-[250px]':showCover,'w-10':!showCover}" @click="$emit('show')">
        <div class="cont_img_back">
          <img :src="imgSrc" alt="书籍封面" class="w-[250px] h-[350px] max-w-[1000px] hover:scale-[1.2]" >
        </div>
        <div v-if="showCover" class="cont_mins">
          <div class="sub_mins">
            <h1 class="mt-3 text-3xl text-center">{{bookRank+1}}</h1>
          </div>
        </div>
      </div>
      <!-- 文本卡片 -->
      <div class="cont_text_ingredients flex-grow p-6 pl-8 bg-white bg-opacity-90" :class="{'ml-60':showCover,'ml-[30px]':!showCover}">
        <!-- 容器 -->
        <div class="w-full h-[290px] flex flex-col justify-between">
          <!-- 标题 -->
          <div class=" pb-2 h-20 overflow-hidden cursor-pointer flex justify-start" :title="bookName" @click="$emit('show')">
            <h1 class="text-4xl my-auto">{{ bookName }}</h1>
          </div>
          <!-- 作者 -->
          <RouterLink :to="'/CreatorMenu/?uname='+bookAuthor" class="flex mb-2">
            <span class="text-xl">{{ bookAuthor }}</span>
          </RouterLink>
          <!-- 指标 -->
          <div class="flex mb-2">
            <span v-if="type=='all'" class="text-xl text-gray-600">{{ readerCnt }}人读过</span>
            <span v-if="type=='recent'" class="text-xl text-gray-600">近三天{{ readerCnt }}人读过</span>
            <span v-if="type=='score'" class="text-xl text-gray-600">推荐值: {{ bookScore.toFixed(1) }}</span>
          </div>
          <!-- 简介 -->
          <div class="flex cursor-pointer" @click="$emit('show')">
            <p class="content text-lg overflow-hidden h-[140px] lg:mr-4 " style="text-align: justify; -webkit-box-orient: vertical; -webkit-line-clamp: 5; display: -webkit-box;" >
            {{ bookReference }}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
const props = defineProps(['imgSrc', 'bookName', 'bookAuthor', 'bookScore', 'bookReference', 'bookRank', 'bookTag', 'readerCnt', 'showCover', 'type']);
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@200..900&display=swap'); */

.cont_modal {
  position: relative;
  height: 350px;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s; 
  transition-delay: 0.7s;
  -webkit-transition-delay: 0.7s;
  -o-transition-delay: 0.7s;
  transition-delay: 0.7s;
}

.cont_photo {
  position: absolute;
  height: 350px;
  overflow: hidden;
  background-color: #eee;
  border-radius:20px;
  float: left;
  z-index: 2;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
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
transition: all 1s;
}

.cont_text_ingredients {
position: relative;
top: 10px;
  height: 330px;
  /* float: left;  */
  border-radius:5px ;
z-index: 3;
box-shadow: 1px 1px  20px  -5px  rgba(0,0,0,0.2);

  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#fbf9f9+28,e8eaed+100 */

 
-webkit-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s; 
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
</style>