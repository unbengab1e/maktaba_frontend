<template>
    <div class="container flex">
        <div v-if="isWide" class="w-44 pr-2 flex flex-col fixed h-screen border-r-2 border-gray-600 rounded-l-xl">
            <div class="mx-auto w-full max-w-md">
                <RadioGroup v-model="selected">
                    <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
                    <div class="space-y-2" >
                        <RouterLink v-for="cate in cates" :to="cate['link']" class=" flex" >
                            <RadioGroupOption
                                as="template"
                                :key="cate.name"
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
                                <i class="my-auto mx-1 w-8 h-8" :class="cate['icon']"></i>
                                <h1 class="text-3xl my-auto font-black">{{ cate['name'] }}</h1>
                            
                                </div>
                            </RadioGroupOption>
                        </RouterLink>
                        
                    </div>
                </RadioGroup>
            </div>
        </div>

        
        <div class="flex-grow flex flex-col" :class="{'ml-44':isWide}">
            <LongBookCard 
            v-for="(book,key) in bookArray" @show="$emit('showDetailWindow',book['bid'])" :img-src="book['img']" :book-rank="key" :book-name="book['name']" :book-author="book['author']" :book-tag="book['tag']" :reader-cnt="book['reading']" :show-cover="isWide" :book-score="book['score']" :type="route.query.cate" 
            ></LongBookCard>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption } from '@headlessui/vue'
import LongBookCard from "../components/LongBookCard.vue";
import { getRec } from '@/api/api.js';

const bookArray = ref()
const cates = [
    {
        color: 'red',
        icon: 'icon-[mingcute--fire-line]',
        name: '热度榜',
        link:'/Top/?cate=all',
    },
    {
        color: 'blue',
        icon: 'icon-[ant-design--rise-outlined]',
        name: '飙升榜',
        link:'/Top/?cate=recent',
    },
    {
        color: 'green',
        icon: 'icon-[ph--thumbs-up-bold]',
        name: '口碑榜',
        link:'/Top/?cate=score',
    },
]
const selected = ref(cates[0])
const emit = defineEmits(['leaveHome'])
const props=defineProps(['isWide'])
const route = useRoute()
const type = ref('Hot')
emit('leaveHome')

onMounted(async () => {
  let res = await getRec('张三',route.query.cate);
  console.log(res);
  bookArray.value = res.data.data.books;
})

watch(route, async () => {
    type.value = route.path
    let res = await getRec('张三',route.query.cate);
    console.log(res);
    bookArray.value = res.data.data.books;
})
</script>

<style scoped>

.category{
    @apply h-14 rounded-l-xl flex justify-center;
}

</style>