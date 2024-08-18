<template>
    <div class="container flex">
        <div v-if="isWide" class="w-44 pr-2 flex flex-col fixed h-screen border-r-2 border-gray-600">
            <div class="window mx-auto w-full max-w-md overflow-y-scroll">
                <RadioGroup v-model="selected">
                    <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
                    <div class="space-y-2" >
                        <RouterLink v-for="cate in cates" :to="cate['link']" class=" flex" >
                            <RadioGroupOption
                                as="template"
                                :value="cate"
                                v-slot="{ active, checked }"
                            >
                                <div
                                :class="[
                                    active
                                    ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                                    : '',
                                    checked ? 'bg-sky-900/75 text-white ' : 'bg-white ',
                                ]"
                                class="relative flex cursor-pointer rounded-lg ml-1 px-2 my-1 h-14 shadow-md focus:outline-none w-40 bg-opacity-80"
                                >
                                <h1 class="text-3xl my-auto font-black">{{ cate['name'] }}</h1>
                            
                                </div>
                            </RadioGroupOption>
                        </RouterLink>                       
                    </div>
                </RadioGroup>
            </div>
        </div>

        <div v-if="!isReady" class="container flex flex-col" :class="{'ml-44':isWide}">
            <div class="container flex flex-wrap justify-left" >
                <NormalBookCardSkeleton v-for="i in 40"></NormalBookCardSkeleton>
            </div>
        </div>

        <div v-if="isReady" class="container flex flex-col" :class="{'ml-44':isWide}">
            <div v-if="route.query.cate=='武侠'" class="flex p-2 mx-4 justify-start">
                <button @click="doGetLittleTag('旧派武侠')" class="h-10 px-2 w-24  m-2 rounded-full flex justify-cente" :class="{'bg-sky-900/75':aaa,'shadow-lg':aaa ,'bg-white':!aaa}">
                    <h1 class="my-auto text-lg " :class="{'text-white':aaa}">
                        旧派武侠
                    </h1>
                </button>
                <button @click="doGetLittleTag('新派武侠')" class="h-10 px-2 w-24 m-2 rounded-full flex justify-center" :class="{'bg-sky-900/75':bbb,'shadow-lg':bbb,'bg-white':!bbb}">
                    <h1 class="my-auto text-lg " :class="{'text-white':bbb}">
                        新派武侠
                    </h1>
                </button>
                <button @click="doGetLittleTag('古仙武侠')" class="h-10 px-2 w-24 m-2 rounded-full flex justify-center" :class="{'bg-sky-900/75':ccc,'shadow-lg':ccc,'bg-white':!ccc}">
                    <h1 class="my-auto text-lg " :class="{'text-white':ccc}">
                        古仙武侠
                    </h1>
                </button>
            </div>
            <div class="container flex flex-wrap justify-left" >
                <NormalBookCard v-for="book in bookArray" @click="$emit('showDetailWindow',book['bid'])" :img-src="book['img']" :book-name="book['name']" :book-author="book['author']" :book-tag="book['tag']" :book-score="book['score']" :book-reference="book['mess']">
                
                </NormalBookCard>
            </div>
        </div>

        
    </div>
</template>

<script setup>
import NormalBookCard from "../components/NormalBookCard.vue";
import { ref, onMounted,watch } from "vue";
import {RadioGroup,RadioGroupLabel,RadioGroupDescription,RadioGroupOption} from '@headlessui/vue'
import { getCate, recordReading, getAll,getLittleTag } from '@/api/api.js';
import { useRoute } from "vue-router";
import NormalBookCardSkeleton from "../components/NormalBookCardSkeleton.vue";

const isReady=ref(false)
const bookArray = ref()
const cates = [
    {
        name: '全部',
        link:'/Library/?cate=all',
    },
    {
        name: '武侠',
        link:'/Library/?cate=武侠',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '算法',
        link:'/Library/?cate=算法',
    },
    {
        name: '诗歌',
        link:'/Library/?cate=诗歌',
    },
    {
        name: '神经网络',
        link:'/Library/?cate=神经网络',
    },
    {
        name: '传记',
        link:'/Library/?cate=传记',
    },
    {
        name: '建筑',
        link:'/Library/?cate=建筑',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
    {
        name: '科幻',
        link:'/Library/?cate=科幻',
    },
]
const selected = ref(cates[0])
const emit = defineEmits(['leaveHome','showDeatailWindow'])
const props=defineProps(['isWide'])
const route = useRoute()
const littleTags = ref([
    '旧派武侠',
        '新派武侠',
        '古仙武侠',
])
const aaa = ref(false)
const bbb = ref(false)
const ccc = ref(false)
emit('leaveHome')

async function doGetLittleTag(tagname) {
    let res = await getLittleTag(tagname);
    console.log(res);
    bookArray.value = res.data.data;
    if (tagname == '旧派武侠') {
        aaa.value = true
        bbb.value = false
        ccc.value = false
    } else if (tagname == '新派武侠') {
        aaa.value = false
        bbb.value = true
        ccc.value = false
    } else { 
        aaa.value = false
        bbb.value = false
        ccc.value=true
    }
}

watch(route, async () => {
    isReady.value=false
    let cate = route.query.cate
    if (cate == 'all') {
        let res = await getAll();
        console.log(res);
        bookArray.value = res.data.data.books;
    } else {
        let res = await getCate(route.query.cate);
        console.log(res);
        bookArray.value = res.data.data;
    }
    isReady.value=true
})

onMounted(async () => {
    let cate = route.query.cate
    if (cate == 'all') {
        let res = await getAll();
        console.log(res);
        bookArray.value = res.data.data.books;
    } else {
        let res = await getCate(cate);
        console.log(cate)
        console.log(res);
        bookArray.value = res.data.data;
    }
    isReady.value=true
})
</script>

<style scoped>
.window{
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
}

.window::-webkit-scrollbar {
  display: none; 
}

</style>