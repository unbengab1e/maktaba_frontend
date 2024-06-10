<template>
  <div class="w-full h-auto flex-col flex">
    <div class=" h-[100px]  min-h-[100px] flex ml-[50px]">
      <div class="change-container" :class=" {'change-container-1': currentRoute.path==='/Bookshelf/BookshelfIndex','change-container-2': currentRoute.path==='/Bookshelf/BookshelfHistory' }" >
        <router-link class="absolute top-[70%] left-0 hover:text-red-400" to="/Bookshelf/BookshelfIndex">喜好顺序</router-link>
        <router-link class="absolute top-[70%] left-[30%] hover:text-red-400" to="/Bookshelf/BookshelfHistory">更新顺序</router-link>
      </div>

    </div>
    <!--  <div class="w-full h-[10%] flex mt-3.5 ml-10">-->
    <!--    <h1 class="text-2xl font-black">-->
    <!--      我的书架-->
    <!--    </h1>-->
    <!--  </div>-->
    <div class="w-full h-full flex flex-wrap ml-5 ">
<!--      <BookCard v-for="(book,index) in bookArray" :key="index" :imgSrc=book.imgSrc :bookName="book.bookName" :book-reference="book.bookReference" :is-read="book.isRead" class="m-4">-->

<!--      </BookCard>-->
      <RouterView>

      </RouterView>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {useRoute} from "vue-router";

const emit=defineEmits(['leaveHome'])
const bookArray= ref([
        {imgSrc:'./shufen.jpg', bookName:'数学分析', bookReference:'工科数学分析',bookScore:'4',  bookClick:'' ,isRead:true},
        {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
        {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
        {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
        {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
        {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
        {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
        {imgSrc:'', bookName:'', bookReference:'',bookScore:'',  bookClick:'' ,isRead:false},
])
const currentRoute = useRoute();
emit('leaveHome')
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
  background-image: linear-gradient(120deg, #7a2133, #6c0808);
  transition: .5s;

}
.change-container-1::after{
  left: 6%;
}
.change-container-2::after{
  left: 30%;
}

.change-container span:nth-child(1):focus + .change-container::after{
  left: 10%;
}


</style>
