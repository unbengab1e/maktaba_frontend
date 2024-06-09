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

        <div class="container flex flex-col" :class="{'ml-44':isWide}">
            <div class="flex p-2 mx-4 justify-start">
                <RouterLink v-for="littleTag in littleTags" :to="'/Library/?cate=武侠&tag='+littleTag" class="h-10 px-2 bg-white m-2 rounded-full flex justify-center">
                    <h1 class="my-auto text-lg">
                        {{ littleTag }}
                    </h1>
                </RouterLink>
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
import { getCate, recordReading, getAll } from '@/api/api.js';
import { useRoute } from "vue-router";

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
emit('leaveHome')

watch(route, async () => {
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
})
</script>

<style scoped>
.window::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>