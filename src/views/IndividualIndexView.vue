<template>
  <div class="w-full h-full flex flex-col">

    <div class="w-full flex bg-white  parent-div " :class="{'flex-col':!showLine, 'min-h-[300px] h-[300px]':showLine}">
      <div class="w-1/3 my-auto">
        <div class="w-full h-1/2 flex mt-1">
          <div class=" h-full flex justify-start items-center">
            <div class="rounded-full  w-[75px] h-[75px] min-w-[75px] hover:scale-110 z-50 hover:shadow-xl" @click="handleUpload">
              <img class="circle-image" :src="imgSrc">
            </div>
          </div>
        <div class="w-[100px] min-w-[100px] h-full flex flex-col ml-[8px]">
        <span class="w-full h-1/2 font-bold mb-auto text-left">
          张三
        </span>
        <span class="w-auto h-auto font-light text-gray-500 text-left ">
          今天我，寒夜里看雪飘过~
        </span>
          </div>
        </div>

      </div>
      <div class="w-[100px] slanted-divider-container" v-if="showLine">
        <div class="slanted-divider"></div>
      </div>

      <div class="w-1/2  mx-auto flex flex-wrap " :class="{'flex-nowrap':!showLine}">
        <div class="w-1/2 h-1/2 flex flex-col justify-center items-center">
          <span class="w-full text-center font-light text-gray-500 flex-grow flex items-end justify-center">
           收藏数
          </span>
          <span class="w-full text-center">
            <span class="font-bold">{{collectCnt}}</span>
            <span class="font-light text-gray-500">本</span>
          </span>
        </div>
        <div class="w-1/2 h-1/2 flex flex-col justify-center items-center">
          <span class="w-full text-center font-light text-gray-500 flex-grow flex items-end justify-center">
           阅读时长
          </span>
          <span class="w-full text-center">
            <span class="font-bold">{{ readingTime.toFixed(1) }}</span>
            <span class="font-light text-gray-500">min</span>
          </span>
        </div>
        <div class="w-1/2 h-1/2 flex flex-col justify-center items-center">
          <span class="w-full text-center font-light text-gray-500 flex-grow flex items-end justify-center">

          </span>
          <span class="w-full text-center">
            <span class="font-bold"></span>
            <span class="font-light text-gray-500"></span>
          </span>
        </div>

      </div>


    </div>
    <div class="bg-white h-[100px]  min-h-[100px] flex ">
      <div class="change-container" :class=" {'change-container-1': currentRoute.path==='/Individual/IndividualIndex/IndividualComment','change-container-2': currentRoute.path==='/Individual/IndividualIndex/IndividualLike','change-container-3': currentRoute.path==='/Individual/IndividualIndex/IndividualWorks' }" >
        <router-link class="absolute top-[70%] left-0 hover:text-red-400 hhh" to="/Individual/IndividualIndex/IndividualComment">我的评论</router-link>
        <router-link class="absolute top-[70%] left-[30%] hover:text-red-400 hhh" to="/Individual/IndividualIndex/IndividualLike">我的评分</router-link>
        <router-link class="absolute top-[70%] left-[60%] hover:text-red-400 hhh" to="/Individual/IndividualIndex/IndividualWorks">我的作品</router-link>

      </div>

    </div>
    <div class="flex">
      <RouterView :is-wide="showLine">

      </RouterView>
    </div>
  </div>

</template>
<script setup>
import {useRoute} from "vue-router";
const collectCnt = ref();
const imgSrc = ref();
const readingTime = ref(0);
const readings =ref([])
onMounted(async () => {
  await getAvatar()
  let res = await getReadingTime('张三')
  readings.value=res.data;
  console.log(readings.value);
  readingTime.value=0;

  for(let i = 0; i < Object.keys(readings).length-1; i++) {

    readingTime.value+=readings.value[i]/60000;

  }

})
async function getAvatar(){
  let res = await getMyAvatar('张三');
  console.log(res)
  imgSrc.value=res.data.avatar;
}
const res = useFileSystemAccess({
  types: [{
    description: 'img',
    accept: {
      'text/plain': ['.jpg', '.png'],
    },
  }],
  excludeAcceptAllOption: true,
})
const props = defineProps(['fans', 'days','words','showLine']);
import { ref, onMounted, onUnmounted } from 'vue';
import {useFileSystemAccess} from "@vueuse/core";
import {getDetail, getMyAvatar, getMyCollect, getReadingTime, postNewChapter, postUploadAvatar} from "@/api/api.js";
import {toast} from "vue3-toastify";
const currentRoute = useRoute();
async function handleUpload(){
  return new Promise((resolve, reject) => {
    res.open().then(async () => {
      console.log(res.file.value);

      const formData = new FormData();
      formData.append('user_id', '14');
      formData.append('avatar', res.file.value); // 添加文件到 FormData

      let ares = await postUploadAvatar(formData); // 传递 FormData 对象
      console.log(ares);
      if(ares.status==200)
      {
        toast.success('上传成功')
      }
      await getAvatar();
      resolve(); // 执行成功后调用 resolve
    }).catch(error => {
      reject(error); // 执行失败时调用 reject
    });
  });
}

</script>
<style scoped>
.slanted-divider {
  height: 100%; /* 分割线的高度 */
  background-image: linear-gradient(to right bottom, transparent 49.5%, #5c5959 50%, transparent 50.5%);
  background-size: 100% 100%;
}
.change-container {
  width: 300px;
  position: relative;
}
.change-container::after{
  content: '';
  position: absolute;
  left: 6%;
  top: 100%;
  width: 10%;
  height: 2px;
  background-image: linear-gradient(120deg,#3498db,#8e44ad);
  transition: .5s;

}
.change-container-1::after{
  left: 6%;
}
.change-container-2::after{
  left: 36%;
}
.change-container-3::after{
  left: 66%;
}
.change-container span:nth-child(1):focus + .change-container::after{
  left: 10%;
}
.circle-image {
  width: 100%; /* 图片宽度填充容器 */
  height: 100%; /* 根据容器宽度自动调整高度 */
  border-radius: 50%; /* 将图片也设置为圆形 */
}

</style>