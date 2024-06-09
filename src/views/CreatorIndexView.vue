<template>
  <div class="w-full h-full flex flex-col">

    <div class="w-full flex bg-white  parent-div " :class="{'flex-col':!showLine, 'h-[300px]':showLine}">
      <div class="w-1/3 my-auto flex " :class="{'flex-col':showLine }">
        <div class="w-full h-1/2 flex mt-1">
          <div class=" h-full flex justify-start items-center">
            <div class="rounded-full bg-black w-[75px] h-[75px] min-w-[75px]">
<!--              <img>-->
            </div>
          </div>
        <div class="w-[100px] min-w-[100px] h-full flex flex-col">
        <span class="w-full h-1/2 font-bold mb-auto text-center">
          用户名称
        </span>
            <span class="w-full h-1/2 font-light text-gray-500 text-center">
          用户签名
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
           粉丝数
          </span>
          <span class="w-full text-center">
            <span class="font-bold">200</span>
            <span class="font-light text-gray-500">人</span>
          </span>
        </div>
        <div class="w-1/2 h-1/2 flex flex-col justify-center items-center">
          <span class="w-full text-center font-light text-gray-500 flex-grow flex items-end justify-center">
           创作天数
          </span>
          <span class="w-full text-center">
            <span class="font-bold">200</span>
            <span class="font-light text-gray-500">天</span>
          </span>
        </div>
        <div class="w-1/2 h-1/2 flex flex-col justify-center items-center">
          <span class="w-full text-center font-light text-gray-500 flex-grow flex items-end justify-center">
           创作字数
          </span>
          <span class="w-full text-center">
            <span class="font-bold">200</span>
            <span class="font-light text-gray-500">万字</span>
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
      <LongBookCard v-for="work in myWorks" @edit="$emit('edit')" :show-cover="showLine" :book-name="work.name" :reading-cnt="work.reading" :score="work.score"  :comment-cnt="work.judge" :is-creator="true" :is-popularize="work.popularized" :is-showing="true">

      </LongBookCard>
    </div>
  </div>
</template>
<script setup>
  import LongBookCard from "@/components/CreatorWorkCard.vue";
  const myWorks = ref([])
  const isMine = ref(false);
  const isCreator = ref(false);
  import {useRoute} from "vue-router";
  const userName = Cookies.get("username");
  const authorScore = ref();
  let route = useRoute();
  // let username = Cookies.get("username");
  const username = ref();

  onMounted(async ()=>{
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

    let res1 = await getAuthorScore(username.value);
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

  import {bookRating, getAuthorScore, getMyWorks, postAuthorScore} from "@/api/api.js";
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




</style>