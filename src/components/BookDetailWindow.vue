<template>
    <div ref="windowBlur" class="transition-[backdrop-filter] duration-500 ease-in-out fixed w-screen h-screen flex-col flex justify-center z-50" @click="hideWindow()" @scroll.stop>
        <div class="absolute bg-black opacity-30 w-full h-full">
        </div>


        <div ref="bkdtwd" class="transition-all duration-500 ease-in-out window fixed flex flex-col w-[90%] md:w-3/4 h-4/5 mx-[5%] md:mx-[12.5%] shadow-lg overflow-y-auto overflow-x-hidden rounded-2xl opacity-0 translate-y-60" @click.stop>
            <div ref="dirbg" class="transition-[opacity] duration-300 ease-in-out absolute right-0 h-full w-full bg-black opacity-0 z-[99] translate-x-full" @click="hideDirectory">
            </div>
            <ul ref="dir" class="transition-all duration-300 ease-in-out absolute right-0 h-full w-80 bg-base-200 z-[100] rounded-2xl p-4 min-h-full text-base-content translate-x-80 overflow-y-scroll window felx flex-col ">
                <li v-for="chapter in directory" class="my-2">
                    <button @click="jumpToReader(chapter['id'])"> 
                        <h2 class="">
                            第{{ chapter['id'] }}章: 
                        </h2>
                        <span>
                            {{chapter['chapteDetail']}}
                        </span>
                    </button>
                </li>
            </ul>
            
            <!-- 简介区 -->
            <div class="flex w-full h-[400px] min-h-[400px] md:h-[500px] md:min-h-[500px] lg:h-[600px] lg:min-h-[600px]">
                <!-- 封面 -->
                <div class="h-full aspect-[5/7] bg-white flex justify-center border-r-2">
                    <img :src="bookInfo['img']" alt="书籍封面" class="w-full aspect-[5/7]">
                </div>

                <div class=" bg-white justify-start h-full flex flex-col-reverse flex-grow">
                    <div class="flex p-2 h-16 bg-base-200 z-[60] justify-between "> 
                        <div class="h-full flex">
                            <span class="text-lg my-auto mx-2">我的评分</span>
                            <StarRating v-if="ok" :value="bookInfo['score']" :editable="true" @rate="rating"></StarRating>
                        </div>

                        <div class="h-full">
                            <button class="btn bg-red-400 hover:bg-red-500 rounded-l-full" @click="doFavorite">
                                <span class="text-xl">收藏</span>
                            </button>

                            <button class="btn bg-sky-400 hover:bg-sky-600 rounded-r-full" @click="showDirectory">
                                <span class="text-xl">目录</span>
                            </button>
                        </div>
                    </div>

                    <div class="window  flex-col overflow-y-auto p-2 h-full" >
                        <div class="h-10 w-full flex justify-center mt-4 mb-4"> 
                            <h1 class="mx-auto font-bold text-4xl " style="height: 40px;">
                                {{ bookInfo['name'] }}
                            </h1>
                        </div>

                        <button class="h-10 w-full flex justify-center my-2" @click="hideWindow('/CreatorMenu/?uname='+bookInfo['author'])"> 
                            <span class="text-xl font-bold mx-auto ">
                                {{ bookInfo['author'] }}
                            </span>
                        </button>
                        
                        <div class="flex justify-center my-2">
                            <span class="text-lg mx-2">全站评分</span>
                            <StarRating v-if="ok" :value="bookInfo['score']" :editable="false"></StarRating>
                        </div>
                        <div class="border-t-2 mx-4" ></div>
                        <div class="flex justify-around w-full h-16 mt-2"> 
                            <div class="w-[30%] h-full flex flex-col">
                                <span class="text-sm mx-auto">阅读人数</span>
                                <h2 class="mx-auto text-2xl">{{bookInfo['reading']}}</h2>
                            </div>
                            <div class="border-[1px]"></div>
                            <div class="w-[30%] h-full flex flex-col">
                                <span class="text-sm mx-auto">分类</span>
                                <h2 class="mx-auto text-2xl">{{bookInfo['tag']}}</h2>
                            </div>
                            <div class="border-[1px]"></div>
                            <div class="w-[30%] h-full flex flex-col">
                                <span class="text-sm mx-auto">评分人数</span>
                                <h2 class="mx-auto text-2xl">{{bookInfo['judge']}}</h2>
                            </div>
                        </div>
                        <h1 class="text-4xl font-bold ml-4 mt-2">简介</h1>
                        <div class="m-4">
                            {{bookInfo['mess']}}
                            
                        </div>
                    </div>

                    
                </div>
            </div>

            <!-- 评论区 -->
            <div class="w-full h-auto bg-white z-50 drop-shadow-sm flex flex-col pt-4 border-t-2">
                
                <span class="text-black text-4xl font-black mr-auto ml-[8%] my-[2.5%]">
                    书籍评论
                </span>
                <div class="container border-t-2"></div>
                <div class="container sticky bg-base-200 p-4 z-[80]" style="top:calc(100% - 80px)">
                    <label class="input input-bordered flex items-center rounded-full">
                        <input v-model="myComment" type="text" class="grow" placeholder="Search" />
                        <button class="badge badge-info h-4/5 my-[10%] -mr-[12px] rounded-full font-bold text-lg bg-sky-400" @click="doComment">发布</button>
                    </label>
                </div>
                <div v-if="noComments" class="container py-4 h-80 bg-white flex justify-center">
                    <h1 class="mt-16 text-2xl"> 
                        还没有评论哦，快来发一条吧！
                    </h1>
                </div>
                <div class="flex flex-col w-full h-auto -mt-16 mb-24">
                    <CommentCard v-for="(comment,index) in comments" :key="index" :content="comment.content" :username="comment.username" class="m-3">

                    </CommentCard>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted, nextTick, computed } from 'vue'
import CommentCard from "../components/CommentCard.vue";
import StarRating from "../components/StarRating.vue";
import { getDetail,getComment,getDirectory,bookRating,postComment,postFavorite } from '@/api/api.js';
import Cookies from 'js-cookie';
import { toast } from "vue3-toastify";

const props = defineProps(['bid'])

const emit = defineEmits(['closeDetailWindow'])
const bkdtwd = ref(null)
const windowBlur = ref(null)
const dirbg = ref()
const dir=ref()
const bookInfo = ref({
    img:''
})
const directory=ref()
const comments = ref([])
const ok = ref(false)
const noComments = computed(() => {
    return comments.value.length==0
})
const myComment = ref('')
const name = Cookies.get('username')
const uid = Cookies.get('user_id')
console.log(typeof uid)

onMounted(async () => {
    //详情
    let res = await getDetail(name,props.bid);
    bookInfo.value = res.data;
    //评论
    let res3 = await getComment(props.bid,'all');
    comments.value = res3.data;
    ok.value = true
    //目录
    let res2 = await getDirectory(props.bid);
    directory.value = res2.data.message;
})

function hideWindow(toURL) {
    // console.log(toURL)
    bkdtwd.value.classList.add("opacity-0")
    bkdtwd.value.classList.add("translate-y-60")
    windowBlur.value.classList.remove('backdrop-blur-sm')
    setTimeout(() => {
        emit('closeDetailWindow',toURL)
    },300)
}

function showDirectory() {
    dir.value.classList.remove('translate-x-80')
    dirbg.value.classList.remove('translate-x-full')
    dirbg.value.classList.remove('opacity-0')
    dirbg.value.classList.add('opacity-30')    
}

function hideDirectory() {
    dir.value.classList.add('translate-x-80')
    dirbg.value.classList.remove('opacity-30')  
    dirbg.value.classList.add('opacity-0')
    setTimeout(() => {
        dirbg.value.classList.add('translate-x-full')
    },300)
}

async function rating(param) {
  let res = await bookRating(name,props.bid,param/2);
  if (res.status == 200) {
        toast.success('评分成功')
    }
}

async function doComment() {
    let res = await postComment(name,props.bid,'all',myComment.value);
    console.log(res);
    myComment.value = ''
    comments.value = res.data
    if (res.status == 200) {
        toast.success('发布成功')
    }
}

async function doFavorite() {
    let res = await postFavorite(uid,props.bid);
    if (res.status == 200) {
        toast.success('收藏成功')
    }
}

function jumpToReader(chapterId) {
    hideWindow('/reader/?bookName='+bookInfo.value['name']+'&bid='+props.bid+'&chapter='+chapterId+'&offset=0')
}

setTimeout(()=> {
    windowBlur.value.classList.add('backdrop-blur-sm')
    bkdtwd.value.classList.remove("opacity-0")
    bkdtwd.value.classList.remove("translate-y-60")
}, 10)
</script>

<style scoped>
.window::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>