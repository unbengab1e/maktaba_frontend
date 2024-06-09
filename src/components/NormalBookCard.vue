<template>
        <div ref="cardContainer" class="flex-grow p-4 flex flex-col justify-between min-w-[200px] max-w-72 aspect-[5/7] bg-gray-100 rounded-xl overflow-hidden shadow-lg normalAnimation hover:bg-gray-300 hover:shadow-xl m-4 hover:scale-110 bg-opacity-90" style="flex-basis: 200px;"  @mouseenter="showScroll()" @mouseleave="hideDeatilCard()">
            <div class="h-3/4 w-3/4 mx-auto">
                <div ref="coverContainer" id="aaaa" class="book-cover h-full w-full
             cursor-pointer ">
                    <img ref="cover" :src="imgSrc" class="aspect-[5/7] h-full z-[80] shadow-lg rounded-md" alt="">
                    <div ref="content" class="window aspect-[5/7] h-full bg-white z-[90] shadow-lg rounded-md p-2 overflow-y-scroll" style="overflow-wrap: break-word;" > 
                        {{bookReference}}
                        <!-- But ere she from the church-door stepped She smiled and told us why: 'It was a wicked woman's curse,' Quoth she, 'and what care I?' She smiled, and smiled, and passed it off Ere from the door she stept— -->
                    </div>
                </div>
            </div>

            

            <div ref="title" class="text-container" :class="{'justify-center':!showAllText}" >
                <h1 v-if="!showAllText" class=" text-2xl">{{bookName}}</h1>
                <p v-if="showAllText" class="transition-all duration-1000 text-2xl scroll-text" :style="{'--overflowlength':-overflowcount+'px','--overflowtime':overflowcount*50+'ms'}" style="font-family: Noto Serif SC, serif;
    font-weight: 700;">{{bookName}}</p>
            </div>   

            <div class="flex justify-center overflow-hidden">
                <h2 class="mx-auto text-base cursor-pointer ">{{bookAuthor}}</h2>
            </div>

                     
        </div>
    
</template>

<script setup>
import { nextTick, ref,onMounted, computed } from "vue";
import { PageFlip } from 'page-flip';


const props = defineProps(['imgSrc', 'bookName','bookAuthor','bookScore','bookReference','bookRank','bookTag','readerCnt','showCover','type','bid']);

const title = ref()
const showAllText = ref(false)
const overflowcount = ref()
const coverContainer = ref()
const cover = ref()
const content = ref()
const cardContainer = ref()
let pageFlip = 0

onMounted(() => { 
    createPageFlip()

})

function createPageFlip() {
    pageFlip = new PageFlip(coverContainer.value, {
        width: coverContainer.value.clientWidth,
        height: coverContainer.value.clientHeight,
        flippingTime:1000,
        useMouseEvents: false,
        size:'stretch',
    });
    pageFlip.loadFromHTML([cover.value, content.value])
}

async function showScroll() {
    if (title.value.firstElementChild.clientWidth == title.value.clientWidth) {
        showAllText.value = true
        await nextTick()
        overflowcount.value = title.value.firstElementChild.clientWidth - title.value.clientWidth
        console.log(title.value.clientWidth)
        console.log(title.value.firstElementChild.clientWidth)
        console.log(overflowcount.value)
    }
    pageFlip.flipNext('top')
}

function hideDeatilCard() {
    showAllText.value = false
    pageFlip.flipPrev('bottom')
}
</script>

<style scoped>
.text-container {
    @apply flex overflow-hidden;
    overflow: hidden;
    --overflowcount:100;
}

.window::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.scroll-text {
  display: inline-block;
  animation: scroll-text var(--overflowtime) linear infinite;
  white-space: nowrap; 
  display: -webkit-box; 
  -webkit-box-orient: vertical;
}

@keyframes scroll-text{
    0%{
        transform: translateX(0px);
    }
    20%{
        transform: translateX(0px);
    }
    70%{
        transform: translateX(var(--overflowlength));
    }
    100%{
        transform: translateX(var(--overflowlength));
    }
}

</style>