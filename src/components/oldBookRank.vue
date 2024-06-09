<template>
  <div class="w-full h-60 m-4 flex rounded-lg">
    <!-- 排名 -->
    <div class="my-auto w-20 ">
        <span class="text-3xl font-bold">{{ bookRank }}</span>
    </div>
    <!-- 封面 -->
    <div class="w-40 my-auto ">
        <img :src="imgSrc" alt="书籍封面">
    </div>
    <!-- 简介 -->
    <div class="flex flex-col flex-grow m-2 p-2 rounded-lg bg-white">
        <!-- 标题 -->
        <div class="flex justify-start mb-2">
            <span class="text-3xl font-bold">{{ bookName }} </span>
        </div>
        <!-- 作者 -->
        <div class="flex justify-start">
            <span class="text-xl font-bold">{{ bookAuthor }} </span>
        </div>
        <!-- 评分 -->
        <div class="flex justify-between">
            <StarRating :value="9" :editable="true" class=""></StarRating>
            <!-- <span class="m-4 text-lg font-bold">
                推荐值: {{ bookInfo['rank'] }}
            </span> -->
            <img src="../assets/img/good.png" class="" alt="">
        </div>
        <!-- tag -->
        <div class="flex flex-wrap px-4- justify-center">
            <div v-for="tag in bookTag" class="badge badge-lg badge-ghost mx-2 mb-4">
                {{ tag }}
            </div>
        </div>
    </div>
  </div>
</template>