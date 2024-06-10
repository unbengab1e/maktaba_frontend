
<template>
  <div class="flex flex-col  h-auto w-[200px] z-50 bg-white" :class="{'w-[200px] min-w-[200px]':showContent,'w-[50px] min-w-[50px] ':!showContent}">
    <RouterLink v-for="sideBarItem in sideBarItems" :to="sideBarItem['path']" :key="sideBarItem.path" class="sidebar">
      <div :class="{ 'bg-gray-100': (  currentRoute.path.startsWith(sideBarItem.path))}" class="transition w-full h-20 flex my-1 hover:bg-gray-50 justify-center items-center">
        <i :class="sideBarItem['icon']" :style="{ color: currentRoute.path.startsWith(sideBarItem.path) ? 'blue' : '' }" class="h-6 w-6 m-auto"></i>
        <span v-if="showContent" style="{ color: sideBarItem.path == currentRoute.path ? 'blue' : '' }" class="font-medium mr-auto">
          {{ sideBarItem['content'] }}
        </span>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {useRoute} from 'vue-router'
const props=defineProps(['showContent']);
const sideBarItems = ref([
  {
    content: "个人主页",
    icon: "icon-[material-symbols--home]",
    path: "/Individual/IndividualIndex",
  }, {
    content: "浏览历史",
    icon: "icon-[lucide--circle-plus]",
    path: "/Individual/IndividualHistory"
  }, {
    content: "数据统计",
    icon: "icon-[akar-icons--statistic-up]",
    path: "/Individual/IndividualInformation"
  },

])

const currentRoute = useRoute()
</script>
<style scoped>
.sidebar{
  position: relative;
}
.sidebar:before {
  content: ''; /* 添加伪元素的内容 */
  display: block; /* 将伪元素设为块级元素 */
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
  /* 设置伪元素的背景为渐变色，透明度从0到0.4，从右向左 */
  background-size: 210% 100%; /* 设置背景尺寸为 210% * 100% */
  background-position: right bottom; /* 设置背景起始位置为右下角 */
  height: 100%; /* 设置伪元素高度为100% */
  width: 100%; /* 设置伪元素宽度为100% */
  position: absolute; /* 将伪元素设为绝对定位，相对于父元素定位 */
  top: 0; /* 从顶部开始 */
  bottom: 0; /* 到底部结束 */
  right: 0; /* 靠右侧 */
  left: 0; /* 靠左侧 */
  border-radius: 5px; /* 设置伪元素圆角 */
  transition: 0.5s; /* 设置伪元素的过渡效果，持续时间为1秒 */
}
.sidebar:hover:before{
  transition: all 1s;
  background-position: left bottom;
}
</style>