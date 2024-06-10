<template >
  <div v-if="!hideOthers" class="fixed right-0 w-auto h-[100vh] flex flex-col justify-center z-50">

    <Dock @leaveHome="leaveHome" :show-dock="isNormal" :change-user-name="isLogin"></Dock>
  </div>

  <div class="flex flex-col">
    <div class="fixed flex h-screen w-screen z-0"  >
      <img v-if="!isCreatorView" src="./assets/img/mountain.jpg" alt="首页背景" class="w-full h-full" style="object-fit: cover;"> 
      <img v-if="isCreatorView" src="./assets/img/star.jpg" alt="" class="w-full h-full" style="object-fit: cover;">
      <div class="fixed w-full h-full bg-black opacity-20 overflow-hidden"></div>

    </div>
    <div v-if="showSearchBlur" ref="searchBlur" class="transition-all fixed  flex h-screen w-screen z-[90]" @click="stopSearching()">
    </div>

    <BaseHeader v-if="!hideOthers"  @startSearching="startSearching()" @doSearching="doSearching" :show-all-button="isNormal" @tryLogin="showLoginWindow" :already-login="isLogin" @signOut="signOut"></BaseHeader>
    

    <div ref="cont" class="w-full h-auto z-0 flex justify-center items-center"  :class="{'px-24':isNormal,'px-8':!isNormal}">
      <RouterView ref="view"  @showDetailWindow="showDetailWindow"   @leaveHome="leaveHome()" @backHome="backHome" :search-content="searchContent" :is-wide="isWide" @edit="showEditWindow" @create="getCreate" @notCreator="notCreator" :change-user-name="isLogin"></RouterView>
    </div>

  </div>

<BookDetailWindow id="detail" v-if="detailWindow" class="fixed top-0 left-0" :bid="bid" @closeDetailWindow="closeDetailWindow"></BookDetailWindow>

<BookEditWindow v-if="editWindow" class="fixed top-0 left-0" @closeEditWindow="closeEditWindow()" :bid="editBid" :is-creating="isCreating">

</BookEditWindow>
<LoginWindow v-if="loginWindow" class="fixed top-0 left-0 z-50" @closeLoginWindow="closeLoginWindow()" @signInSuccess="signInSuccess">

</LoginWindow>

</template>

<script setup>
import { ref,watch,nextTick,computed,onMounted } from "vue";
import { RouterView,useRoute } from 'vue-router'
import BaseHeader from './components/BaseHeader.vue';
import Dock from './components/Dock.vue';
import BookDetailWindow from "./components/BookDetailWindow.vue";
import Cookies from 'js-cookie';
import BookEditWindow from "@/components/BookEditWindow.vue";
import LoginInCard from "@/components/LoginInCard.vue";
import LoginWindow from "@/components/LoginWindow.vue";
import { recordReading } from '@/api/api.js';

// 设置 Cookie
// Cookies.set('username', '未登录', { expires: 7 });
// Cookies.set('userid', '14', { expires: 7 });

// Cookies.remove('username')
// Cookies.remove('userid')
const detailWindow = ref(false)
const route = useRoute()
const showSearchBlur = ref(false)
const searchBlur = ref(null)
const isWide = ref(window.innerWidth >= 1000)
const isNormal = ref(window.innerWidth >= 750)
const searchContent=ref('')
const bid = ref(1)
const view = ref()
const isCreating = ref(false);
const editBid = ref();
const editWindow = ref(false)
const loginWindow = ref(false)
const isCreatorView = ref(false)
const hideOthers = ref(false)
const cont = ref()
const isLogin = ref(false)

onMounted(() => {
  // console.log(getCookie('username'))
  if (getCookie('username') == null) {
    isLogin.value=false
  } else {
    isLogin.value=true
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth < 750) {
    isNormal.value=false
    isWide.value=false
  } else if(window.innerWidth < 1000){
    isNormal.value = true
    isWide.value=false
  } else {
    isWide.value = true
    isNormal.value=true
  }
})

// 关闭页面滚动
function stopMove(){
	  let m = function(e){e.preventDefault();};
	  document.body.style.overflow='hidden';
	  document.addEventListener("touchmove",m,{ passive:false });
	}
//开启页面滚动
function	Move(){
	  let m =function(e){e.preventDefault();};
	  document.body.style.overflow='';//出现滚动条
	  document.removeEventListener("touchmove",m,{ passive:true });
	}

async function showDetailWindow(param) {
  detailWindow.value = true
  bid.value=param
  stopMove()
  // let res = await recordReading(param,Cookies.get('username'));
}

function closeDetailWindow(param) {
  detailWindow.value = false
  console.log(param)
  Move()
  if (param != undefined) {
    nextTick(() => {
      window.location.replace(param)
    })
  }
}

function leaveHome() {
  document.getElementById('logo').classList.add('-mt-[84px]')
  document.getElementById('logo').classList.remove('mt-60')
  setTimeout(() => {
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
  }, 400)
}

function backHome() {
  document.getElementById('logo').classList.remove('-mt-[84px]')
  document.getElementById('logo').classList.add('mt-60')
  isCreatorView.value=false
  setTimeout(() => {
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
  }, 400)
}

function startSearching() {
  if (route.path=='/') {
    document.getElementById('searchBar').classList.add('z-[100]')
    document.getElementById('logo').classList.add('z-[100]')
    showSearchBlur.value = true
    stopMove()
    setTimeout(() => {
      searchBlur.value.classList.add('backdrop-blur-lg')
    },10)
  }
}

function doSearching() {
  stopSearching()
}

function stopSearching() {
  if (route.path=='/') {
    showSearchBlur.value = false
    searchBlur.value.classList.remove('backdrop-blur-lg')
    Move()
    setTimeout(() => {
      document.getElementById('searchBar').classList.remove('z-[100]')   
      document.getElementById('logo').classList.remove('z-[100]')   
    },150)
  }
}

function getCreate()
{
  isCreating.value = true;
  editBid.value=0;
  editWindow.value = true
  stopMove()

}

function showEditWindow(param) {
  editBid.value=param;
  isCreating.value = false;
  editWindow.value = true
  stopMove()
}
function showLoginWindow() {
  loginWindow.value = true
  stopMove()
}
function closeEditWindow() {
  editWindow.value = false
  Move()
}
function closeLoginWindow() {
  loginWindow.value = false
  Move()
}
function notCreator() {
  isCreatorView.value=true
}

function signInSuccess() {
  isLogin.value=true
  console.log(isLogin)
  console.log(Cookies.get('username'))
}

function getCookie(user) {
  var cookieArr = document.cookie.split(';');
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=');
    if (user == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function signOut() {
  Cookies.remove('username')
  Cookies.remove('user_id')
  isLogin.value = false
}

watch(route, () => {
  if (route.path.match('/reader/')) {
    hideOthers.value = true
    cont.value.classList.remove('h-auto')
    cont.value.classList.add('h-screen')
  } else {
    hideOthers.value = false
    if (cont.value.classList.contains('h-screen')) {
      cont.value.classList.add('h-auto')
      cont.value.classList.remove('h-screen') 
    }
  }
})
</script>


<style> 
html:has(.drawer-toggle:checked) {
  scrollbar-gutter: auto;
}
</style>