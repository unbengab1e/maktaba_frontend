<template>
  <div class="h-auto w-full flex flex-col">
    <h2 class="font-bold text-2xl mt-[10px] ml-[10px]">
      个人信息
    </h2>
    <div class="h-[1px] w-full bg-gray-200 mt-2" >

    </div>
    <div class="flex justify-center mt-[10px]">
      <h1 class="my-auto">
         昵称:
      </h1>
      <div class="txt-one">
        <input type="email" maxlength="20" v-model="nickname" :class="{'txt-placeholder':nickname!==''}" >
        <span data-placeholder="Nickname">

        </span>
      </div>
    </div>
    <div class="flex justify-center mt-[10px]">
      <h1 class="my-auto">
         签名:
      </h1>
      <div class="txt-line">
        <textarea rows="4" v-model="signal" :class="{'txt-placeholder':signal!==''}"></textarea>
        <span data-placeholder="Password">

        </span>
      </div>
    </div>
    <div class="flex justify-center mt-[10px]">
      <h1 class="my-auto">
         出生日期:
      </h1>
      <div class="txt-one">
        <input type="date" maxlength="20" v-model="birthday" :class="{'txt-placeholder':birthday  !==''}" >
        <span >

        </span>
      </div>
    </div>
    <span class="font-bold text-2xl mt-[10px] ml-[10px]">
      账号安全
    </span>
    <div class="h-[1px] w-full bg-gray-200 mt-2" >

    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";

const signal = ref('');
const nickname = ref('');
const birthday = ref('');
</script>



<style scoped>
.txt-one {
  border: 2px solid #adadad;
  border-radius: 10px;
  position: relative;
  margin: 10px 10px;
  width: 60%;
  min-width: 300px;

}

.txt-one input {
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  padding: 0 3px;
  height: 35px;
  z-index: 1;
}

.txt-one span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  transition:.5s;
  z-index: 0;

}
.txt-one span::after {
  content: '';
  position: absolute;
  left: 1%;
  top: 100%;
  width: 0%;
  height: 2px;
  background-image: linear-gradient(120deg,#3498db,#8e44ad);
  transition: .5s;
}

.txt-one input:focus + span::before {
  //left:80%;
  top:-5px;
  opacity: 0;
}

.txt-one input:focus + span::after {
  width: 98%;
}
.txt-placeholder + span::before {
  opacity: 0;
}
.txt-line {
  border: 2px solid #adadad;
  border-radius: 10px;
  position: relative;
  margin: 10px 10px;
  width: 60%;
  min-width: 300px;
}

.txt-line textarea {
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  padding: 5px;
  z-index: 1;
}

.txt-line span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-200%);
  transition: .5s;
  z-index: 0;
}

.txt-line span::after {
  content: '';
  position: absolute;
  left: 1%;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-image: linear-gradient(120deg,#3498db,#8e44ad);
  transition: .5s;
}

.txt-line textarea:focus + span::before {
  top:-5px;
  //left: 80%;
  opacity: 0;
}

.txt-line textarea:focus + span::after {
  width: 98%;
}

.txt-placeholder + span::before {
  opacity: 0;
}

</style>