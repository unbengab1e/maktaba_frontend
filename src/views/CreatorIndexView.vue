<template>
  <div class="w-full h-full flex flex-col">

    <div class="w-full flex bg-white  parent-div " :class="{'flex-col':!showLine, 'h-[300px]':showLine}">
      <div class="w-1/3 my-auto flex " :class="{'flex-col':showLine }">
        <div class="w-full h-1/2 flex mt-1">
          <div class=" h-full flex justify-start items-center">
            <div class="rounded-full  w-[75px] h-[75px] min-w-[75px]">
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
        <StarRating v-if="isMine" value="" :editable="false" :class="{'ml-[10%] mt-[10%]':showLine, 'ml-[90%]':!showLine}">

        </StarRating>
        <StarRating v-if="!isMine" value="0" :editable="true"  :class="{'ml-[10%] mt-[10%]':showLine, 'ml-[90%]':!showLine}" @rate="rating">

        </StarRating>
      </div>
      <div class="w-[100px] slanted-divider-container" v-if="showLine">
        <div class="slanted-divider"></div>
      </div>

      <div class="w-1/2  mx-auto flex flex-wrap " :class="{'flex-nowrap':!showLine}">
        <div class="w-1/2 h-1/2 flex flex-col justify-center items-center">
          <span class="w-full text-center font-light text-gray-500 flex-grow flex items-end justify-center">
           作品数
          </span>
          <span class="w-full text-center">
            <span class="font-bold">2</span>
            <span class="font-light text-gray-500">本</span>
          </span>
        </div>
        <div class="w-1/2 h-1/2 flex flex-col justify-center items-center">
          <span class="w-full text-center font-light text-gray-500 flex-grow flex items-end justify-center">
           评分
          </span>
          <span class="w-full text-center">
            <span class="font-bold">{{authorScore}}</span>
            <span class="font-light text-gray-500"></span>
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
    <div class="h-1/2 w-full flex flex-col">
      <span class="font-bold text-2xl ml-5">
        全部作品
      </span>
      <div class="h-[1px] w-full bg-gray-200 mt-2" >

      </div>
      <LongBookCard v-for="work in myWorks" @edit="$emit('edit')" :img-src="work.img" :show-cover="showLine" :book-name="work.name" :reading-cnt="work.reading" :score="work.score"  :comment-cnt="work.judge" :is-creator="true" :is-popularize="work.popularized" :is-showing="true">

      </LongBookCard>
    </div>
  </div>
</template>
<script setup>
  import LongBookCard from "@/components/CreatorWorkCard.vue";
  const myWorks = ref([])
  const isMine = ref(false);
  const isCreator = ref(false);
  const imgSrc = ref();
  import {useRoute} from "vue-router";
  const userName = Cookies.get("username");
  const authorScore = ref();
  let route = useRoute();
  // let username = Cookies.get("username");
  const username = ref();
  async function getAvatar(){
    let res = await getMyAvatar('张三');
    console.log(res)
    imgSrc.value=res.data.avatar;
  }
  onMounted(async ()=>{
    await getAvatar();
    let res = await getMyWorks(route.query.uname);
    username.value=route.query.uname;
    if(username === userName)
    {
      isMine.value = true;
    }
    else
    {
      isMine.value = false;
    }
    console.log(res);
    myWorks.value=res.data.message;
    console.log(myWorks.value);

    let res1 = await getAuthorScore('张三');
    authorScore.value=res1.data.rate;
    console.log(res1);

  });
  async function rating(param) {
    let res = await postAuthorScore('张三', username.value, param / 2);
    // console.log(res);
    if (res.status == 200) {
      toast.success('评分成功')
    }
  }
  const props = defineProps(['fans', 'days','words','showLine']);
  import { ref, onMounted, onUnmounted } from 'vue';

  import {bookRating, getAuthorScore, getMyAvatar, getMyWorks, postAuthorScore} from "@/api/api.js";
  import StarRating from "@/components/StarRating.vue";
  import Cookies from "js-cookie";
  import {toast} from "vue3-toastify";


</script>
<style>
.slanted-divider {
  height: 100%; /* 分割线的高度 */
  background-image: linear-gradient(to right bottom, transparent 49.5%, #5c5959 50%, transparent 50.5%);
  background-size: 100% 100%;
}
.circle-image {
  width: 100%; /* 图片宽度填充容器 */
  height: 100%; /* 根据容器宽度自动调整高度 */
  border-radius: 50%; /* 将图片也设置为圆形 */
}



</style>