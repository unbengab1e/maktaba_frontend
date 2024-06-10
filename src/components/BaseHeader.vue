<template>
  <div class="fixed w-screen h-24 z-10 blurblock"></div>
  <!-- logo -->
  <RouterLink to="/" class="fixed flex left-6 mt-4 z-50 p-1 rounded-full bg-white shadow-lg h-[52px]">
    <span class="galada-regular my-2 text-3xl mx-2 align-baseline" style="background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);-webkit-background-clip: text; -webkit-text-fill-color: transparent;">Maktaba</span>
  </RouterLink>

  <!-- 按钮区 -->
  <div class="flex fixed right-6 mt-4 z-50 p-1 rounded-full bg-white shadow-lg">
    <div v-if="showMessages &&hasNewChap" class="absolute left-[72px] bg-red-400 w-4 h-4 rounded-full"></div>
    <!-- 头像 -->
    <div ref="head" type="button" class="h-11 w-11 rounded-full overflow-hidden inline-flex items-center justify-center text-gray-700 origin-top drop-shadow-xl z-[52] normalAnimation" @mouseenter="showUserMenu=true" @mouseleave="leaveHead()" >
      <RouterLink v-if="isLogin" to="/Individual">
        <img :src="headSrc" class="image-full" alt="头像">
      </RouterLink>
      <button v-if="!isLogin" @click="$emit('tryLogin')">
        <img src="../assets/img/未登录.jpg" class="image-full" alt="头像">
      </button>
    </div>
    <!-- 消息 -->
    <div ref="message" class="normalAnimation h-6 w-6 my-auto m-2 rounded-full">
      <button @click="showMessMenu()" class="w-full h-full">
        <icon class="icon-[material-symbols--notifications-outline] w-full h-full" />
      </button>
    </div>
    <!-- 书架 -->
    <div ref="shelf" class="normalAnimation h-6 w-6 my-auto m-2 rounded-full">
      <RouterLink to="/Bookshelf/BookshelfIndex" class="w-full h-full">
        <icon class="icon-[mi--favorite] w-full h-full" />
      </RouterLink>
    </div>
    <!-- 历史 -->
    <div ref="history" class="normalAnimation h-6 w-6 my-auto m-2 rounded-full">
      <RouterLink to="/Individual/IndividualHistory" class="w-full h-full">
        <icon class="icon-[material-symbols--history] w-full h-full" />
      </RouterLink>
    </div>
    <!-- 投稿 -->
    <div class="h-11 w-11 my-auto rounded-full flex justify-center bg-sky-500/80 shadow-sm shadow-sky-500 z-[51]">
      <RouterLink :to="'/Creator/CreatorIndex/?uname='+username" class="w-6 h-6 my-auto">
        <icon class="icon-[material-symbols--upload] h-6 w-6 bg-white" />
      </RouterLink>
    </div>
  </div>

  <!-- 大logo -->
  <div id="logo" class="transition-[margin-top] ease-in-out duration-500 flex justify-center mx-auto mb-8 mt-60 z-30 ">
    <span class="galada-regular my-1 text-6xl mx-2 align-baseline" style="color:white; text-shadow: 6px 6px 3px hsla(14, 100%, 30%, 1);" >Maktaba</span>
    <span class="galada-regular my-1 text-6xl mx-2 align-baseline" style="color:white;text-shadow: 6px 6px 3px hsla(14, 100%, 30%, 1);">Reader</span>
  </div>

  <!-- 搜索框 -->
  <div id="searchBar" class="transition-[margin-top] ease-in-out duration-500 flex flex-col mx-auto w-1/2 h-20 sticky top-4 z-30">
    <div ref="sb" class="transition-[width,color,background-color,border-color,box-shadow] mx-auto ease-in-out duration-500 top-0 sticky flex shadow-lg w-full h-[52px] border-2 rounded-full -rounded-e-full focus-within:shadow-2xl focus-within:border-blue-500 focus-within:shadow-blue-400" @click.stop>
      <input type="text" class="h-full w-full outline-none rounded-full pl-8" @focusin="showSearchButton=true;$emit('startSearching')" v-model="searchContent" @focusout="showSearchButton=false" placeholder="请输入搜索内容">

      <RouterLink :to="'/Search/?q='+searchContent" class="absolute flex justify-center h-10 aspect-square right-1 mt-1 rounded-full " :class="{'bg-gray-300':showSearchButton,'shadow-sm':showSearchButton}" @click="doSearch">
        <i class="icon-[material-symbols--search] w-8 h-8 my-auto"></i>
      </RouterLink>
    </div>
  </div>

  <!-- 用户下拉菜单 -->
  <div ref="usmn" @mouseleave="leaveUserMenu()" class="transition-all duration-300 ease-in-out flex flex-col justify-around fixed z-40 h-auto w-60 rounded-xl mt-24 bg-white right-24 p-2 shadow-md opacity-0 -translate-y-[600px] pt-12">
    <!-- id -->
    <div class="w-full h-24 rounded-md flex flex-col p-2 py-1">
      <div class="flex justify-center"> 
        <h1 class="text-3xl">{{username}}</h1>
      </div>
      <div class="border-[1px]"></div>
      <div class="flex justify-center w-full h-full mt-1"> 
        <div to="/Individual/IndividualIndex/IndividualFocus" class="flex-grow h-full flex justify-center mt-1">
          <h2 class="text-md">阅读时长 {{readingTime}}h</h2>
        </div>
        <div class="border-[1px]"></div>
        <div to="#" class="flex-grow h-full flex justify-center mt-1">
          <h2 class="text-md">读书数目 {{readingNum}}</h2>
        </div>
      </div>
    </div>

    <RouterLink v-for="menuItem in menuItems" :to="menuItem['to']" class="w-full h-10 bg-gray-200 rounded-md shadow-sm my-1 flex justify-between p-2">
      <icon :class="menuItem['icon']" class="my-auto"></icon>
      <span class="my-auto flex-grow pl-2 content">{{ menuItem['name'] }}</span>
      <icon class="icon-[material-symbols-light--arrow-forward-ios] my-auto" />
    </RouterLink>

    <div class="border-[1px] my-1 -mx-2"></div>

    <div class="w-full h-10 my-1 flex justify-around">
      <button class="text-gray-400 hover:text-black" @click="$emit('signOut')">
        <i class="icon-[uil--signout]" />
        退出登录
      </button>
      <label class="cursor-pointer label">
        <span class="label-text mr-2">保持登录</span> 
        <input type="checkbox" v-model="holdLogin" class="toggle toggle-success" :checked="holdLogin"/>
      </label>
    </div>
  </div>

  <!-- 通知菜单 -->
  <div ref="messmenu" class="transition-all duration-300 ease-in-out justify-around fixed z-40 h-96 w-64 rounded-xl mt-24 bg-white right-12 p-4 shadow-md opacity-0 -translate-y-[600px] ">
    <div class="flex justify-between">
      <button class="h-8 flex justify-center rounded-md w-24"  @click="showMessages=!showMessages">
        <h2 class="my-auto">更新提醒</h2>
        <icon v-if="showMessages" class="icon-[fluent-mdl2--ringer] w-5 h-5 my-[6px] ml-1" />
        <icon v-if="!showMessages" class="icon-[fluent-mdl2--ringer-off] w-5 h-5 my-[6px] ml-1" />
      </button>
      <button class="hover:bg-gray-300 h-8 flex justify-center rounded-md w-20" @click="readAll()">
        <h2 class="my-auto">全部已读</h2>
      </button>
    </div>
    <div class="h-80 w-full window overflow-y-scroll">
      <RouterLink :to="'/reader/?bookName='+newChap['title']+'&bid='+newChap['bid']+'&chapter='+newChap['chapter_id']+'&offset=0'" v-for="newChap in newChaps"  class="w-full h-20 flex flex-col bg-gray-200 rounded-md shadow-sm my-2 p-2" @click="doReadMessage(newChap['id'])">
        <div class="flex justify-between">
          <h1 class="text-lg">《{{ newChap['title'] }}》</h1>
          <div v-if="newChap['alreadyRead']==false" class="badge badge-error"></div>
        </div>
        <div class="flex justify-between p-1 my-2">
          <span class="text-md">{{ newChap['chapter_name'] }}</span>
          <icon class="icon-[material-symbols-light--arrow-forward-ios] translate-y-1" />
        </div>
      </RouterLink>
    </div>
  </div>

  <div v-if="showLoginView" class="absolute w-full h-screen z-50 shadow-md rounded-md border-2">
    <button class="fixed top-2 right-2" @click="showLoginView=false">
      <span class="icon-[material-symbols--close] h-12 w-12"></span>
    </button>
  </div>
</template>

<script setup>
import { onMounted, computed, ref ,watch} from "vue"
import { mousePosition } from "../main.js";
import Cookies from 'js-cookie'
import { getNewChap,checkNewChap,readMessage,getMyAvatar,getReadingTime,getReadingNum } from '@/api/api.js';
import { toast } from "vue3-toastify";

const showUserMenu = ref(false)
const showSearchButton = ref(false)
const isLogin = computed(() => {
  return props.alreadyLogin
})
const holdLogin = ref(false)
const showLoginView = ref(false)
const props = defineProps(['showAllButton','alreadyLogin','headChanged'])
const emit = defineEmits(['search'])
const showAllButton = computed(() => props.showAllButton)
const sb = ref()
const usmn = ref()
const head = ref()
const message = ref()
const shelf = ref()
const history = ref()
const menuItems = ref([
  {
    name: '我的评论',
    icon: 'icon-[material-symbols--comment]',
    to:'/Individual/IndividualIndex/IndividualComment',
  },
  {
    name: '我的评分',
    icon: 'icon-[streamline--hearts-symbol-solid]',
    to:'/Individual/IndividualIndex/IndividualLike',
  },
  {
    name: '我的作品',
    icon: 'icon-[ph--book-bookmark-fill]',
    to:'/Individual/IndividualIndex/IndividualWorks',
  },
])
const searchContent = ref('')
const username = ref(Cookies.get('username'))
const userid=ref(Cookies.get('user_id'))
const messmenu = ref()
const newChaps = ref([])
const hasNewChap = ref(false)
const headSrc = ref('')
const readingTime = ref(0)
const readingNum = ref(0)
const showMessages = ref(true)
const headChanged=computed(()=>props.headChanged)
let cnt=0

onMounted(async () => {
  let res1 = await checkNewChap(userid.value)
  // console.log(res1)
  hasNewChap.value = (res1.data.message.match('存在未读消息'))
  console.log(hasNewChap.value)
  

  let res2 = await getNewChap(userid.value)
  // console.log(res2)
  newChaps.value = res2.data.message

  let res3 = await getMyAvatar(username.value)
  headSrc.value = res3.data.avatar

  if (!isLogin.value) {
    username.value='未登录'
  } else {
    let res3 = await getReadingTime(username.value)
    console.log(res3)
    readingTime.value = Object.getOwnPropertyNames(res3.data).length

    let res4 = await getReadingNum(username.value)
    console.log(res4)
    readingNum.value = res4.data.count
  }
  console.log(Cookies.get('user_id'))
})

//  决定是否show用户菜单
watch(showUserMenu, (newShow) => {
  if (newShow == true) {
    usmn.value.classList.remove('opacity-0')
    usmn.value.classList.remove('-translate-y-[600px]')
    head.value.classList.add('scale-[2.5]')
    head.value.classList.add('translate-y-4')
  } else {
    usmn.value.classList.add('opacity-0')
    usmn.value.classList.add('-translate-y-[600px]')
    head.value.classList.remove('scale-[2.5]')
    head.value.classList.remove('translate-y-4')
  }
})

watch(headChanged,async () => {
  let res2 = await getMyAvatar(username.value)
  headSrc.value = res2.data.avatar
})

//决定是否变短按钮栏
watch(showAllButton, (newShow) => {
  if (newShow) {
    history.value.classList.remove('translate-x-10')
    shelf.value.classList.remove('translate-x-20')
    message.value.classList.remove('translate-x-[120px]')
    head.value.classList.remove('-mr-[164px]')
    head.value.classList.remove('origin-top-right')
    usmn.value.classList.remove('right-16')
  } else {
    history.value.classList.add('translate-x-10')
    shelf.value.classList.add('translate-x-20')
    message.value.classList.add('translate-x-[120px]')
    head.value.classList.add('-mr-[164px]')
    head.value.classList.add('origin-top-right')
    usmn.value.classList.add('right-16')
  }
})

//检查是否登录
watch(isLogin,async () => {
  username.value = Cookies.get('username')
  userid.value = Cookies.get('user_id')
  let res2 = await getMyAvatar(username.value)
  headSrc.value = res2.data.avatar
  let res3 = await getNewChap(userid.value)
  // console.log(res2)
  newChaps.value = res3.data.message
})

//已读消息
async function doReadMessage(message_id) {
  let res = await readMessage(userid,message_id);
  console.log(res);
  let i=0
  if (res.status == 200) {
    for (i = 0; i < newChaps.value.length; i++) {
      let chap = newChaps.value[i]
      if (chap['id'] == message_id) {
        chap['alreadyRead']=true
      }
    }
  }
}

async function readAll() {
  let res = await readMessage(userid,0);
  console.log(res);
  let i=0
  if (res.status == 200) {
    for (i = 0; i < newChaps.value.length; i++) {
      let chap = newChaps.value[i]
      chap['alreadyRead']=true
    }
    hasNewChap.value=false
    toast.success('成功')
  }
}

// 鼠标离开头像
function leaveHead(event) {
  console.log('call leaveHead')
  const t = usmn.value.getBoundingClientRect().top
  const r = usmn.value.getBoundingClientRect().right
  const b = usmn.value.getBoundingClientRect().bottom
  const l = usmn.value.getBoundingClientRect().left
  if (mousePosition.x > r || mousePosition.x < l || mousePosition.y < t || mousePosition.y > b) {
    console.log('changed')
    showUserMenu.value=false
  }
}
// 鼠标离开用户菜单
function leaveUserMenu(event) {
  console.log('call leaveMenu')
  const t = head.value.getBoundingClientRect().top
  const r = head.value.getBoundingClientRect().right
  const b = head.value.getBoundingClientRect().bottom+5
  const l = head.value.getBoundingClientRect().left-5
  if (mousePosition.x > r || mousePosition.x < l || mousePosition.y < t || mousePosition.y > b) {
    console.log('changed')
    showUserMenu.value=false
  }
}

function doSearch() {
  if (searchContent.value == ''){
    alert('请输入内容')
    return
  }
  emit('doSearching')
  setTimeout(() => {
    searchContent.value=''
  }, 100);
}

function showMessMenu() {
  if (cnt % 2 == 0) {
      messmenu.value.classList.remove('opacity-0')
    messmenu.value.classList.remove('-translate-y-[600px]')
  } else {
      messmenu.value.classList.add('opacity-0')
    messmenu.value.classList.add('-translate-y-[600px]')
  }
    cnt++
}
// 搜索框缩小
window.addEventListener('scroll', () => {
  const sbPosition = sb.value.getBoundingClientRect().top
  if (sbPosition <= 100) {
    sb.value.classList.remove('w-full')
    sb.value.classList.add('w-2/3')
  } else {
    sb.value.classList.remove('w-2/3')
    sb.value.classList.add('w-full')
  }
})
</script>

<style scoped>
.blurblock{
  mask: linear-gradient(black, black, transparent);
  backdrop-filter: blur(8px);
}

.window::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>