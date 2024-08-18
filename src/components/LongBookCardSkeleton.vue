<template>
    <div class="cont_modal cont_modal_active m-4 flex ">
        <!-- 封面 -->
        <div class="cont_photo cursor-pointer skeleton" :class="{'w-[250px]':showCover,'w-10':!showCover}"  @click="$emit('show')">
        </div>
        <!-- 文本卡片 -->
        <div class="cont_text_ingredients flex-grow p-6 pl-8 bg-white bg-opacity-50" :class="{'ml-60':showCover,'ml-[30px]':!showCover}" style="backdrop-filter: var(--mak-glass-1);">
            <!-- 容器 -->
            <div class="w-full h-[290px] flex flex-col justify-between">
                <!-- 标题 -->
                <div class="h-12 w-80 mb-6 skeleton">
                </div>
                <!-- 作者 -->
                <div class=" mb-4 h-6 w-28 skeleton">
                </div>
                <!-- 指标 -->
                <div class=" mb-4 h-6 w-20 skeleton">
                </div>
                <!-- 简介 -->
                <div v-for="i in 3" class="mb-2 h-6 w-full skeleton" >
                </div>
                <div class="mb-2 h-6 skeleton" style="width: calc(100% - 120px);"> 
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props=defineProps(['showCover'])
</script>

<style  scoped>
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

.cont_text_ingredients {
position: relative;
top: 10px;
  height: 330px;
  border-radius:5px ;
z-index: 3;
box-shadow: 1px 1px  20px  -5px  rgba(0,0,0,0.2);
-webkit-transition: all 0.5s;
-o-transition: all 0.5s;
transition: all 0.5s; 
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

</style>