<template>
  <div ref="windowBlur" class="transition-all duration-300 ease-in-out fixed w-screen h-screen flex-col flex justify-center z-50" @click="hideWindow()" @scroll.stop>
    <div class="absolute bg-black opacity-30 w-full h-full">

    </div>
    <div ref="bkdtwd" class="transition-all duration-300 ease-in-out window fixed flex flex-col w-[90%] md:w-3/4 h-4/5 mx-[5%] md:mx-[12.5%] shadow-lg overflow-auto rounded-2xl opacity-0 translate-y-60" @click.stop>

      <!-- 简介区 -->
      <div class="flex container h-full">
        <!-- 封面 -->
        <div class="h-full w-2/5 bg-white flex justify-center border-r-2 bg-cover aaa"  >
          <img :src="bookInfo['img  ']" alt="书籍封面" class="m-auto h-full aspect-[5/7]">
        </div>

        <div class="flex flex-col-reverse w-3/5 bg-white">
          <div class="w-full h-[500px] border-t-2 flex justify-between transition-all" :class="{'h-[500px]': isUploading, 'h-[80px] max-h-[80px]' : !isUploading}" >
            <div class="m-2 flex">
<!--              <VueDraggable v-if="isUploading" v-model="files" :scroll="true" target=".sort-target" class="bg-gray-100 h-auto">-->
<!--                <TransitionGroup name="fade" class="sort-target" type="transition" tag="ul">-->
<!--                  <li v-for="(file,index) in files ":key="file.id" class="txt-one mt-[4px] bg-gray-200" >-->


<!--                    <icon class="icon-[teenyicons&#45;&#45;drag-horizontal-outline]"></icon>-->
<!--                    <input v-model="file.filename" type="text" >-->
<!--                    <span ></span>-->
<!--                    <icon class="icon-[fxemoji&#45;&#45;cancellationx]" @click="remove(index)"></icon>-->




<!--                  </li>-->
<!--                </TransitionGroup>-->
<!--              </VueDraggable>-->
<!--              <span>-->
<!--                {{uploadFileName}}-->
<!--              </span>-->
              <div v-if="!isCreating" class="txt-one w-full h-[60px]">
                <input v-model="chapterName" type="text" >
                <span data-placeholder="chapterName"></span>
              </div>

            </div>

            <button v-if="!isCreating" class="gradient-blue ml-[15px] hover:drop-shadow-xl shadow-md hover:bg-blue-600 ml-auto my-auto " @click="!isUploading&&toggleUploading();handleOpen();" >
              <icon class="icon-[solar--upload-outline] ml-[4px] bg-white"></icon>
              <span class="ml-[18px] text-white font-bold">上传</span>
            </button>
            <button v-if="isCreating" class="gradient-blue ml-[15px] hover:drop-shadow-xl shadow-md hover:bg-blue-600 ml-auto my-auto "@click="handleCreate()" >
              <icon class="icon-[solar--upload-outline] ml-[4px] bg-white"></icon>
              <span class="ml-[18px] text-white font-bold">创建</span>
            </button>
          </div>

          <div class="window flex flex-col w-full h-full overflow-auto p-2" @click="isUploading&&toggleUploading()">
            <div v-if="!isEditTitle" class="flex items-center justify-center">

              <h1 v-if="!isCreating"  class=" font-bold text-4xl my-8">
                {{ bookInfo['name'] }}
              </h1>
              <h1 v-if="isCreating"  class=" font-bold text-4xl my-8">
                {{ bookName }}
              </h1>
              <icon v-if="isCreating" class="icon-[material-symbols-light--edit-square]  " @click="toggleEditTitle"></icon>
            </div>

            <input v-if="isEditTitle" class="mx-auto font-bold text-4xl my-8 " v-model="bookName" @blur="toggleEditTitle">
            <ul v-if="isCreating" class="menu bg-base-200 w-56 rounded-box">
              <li>
                <details>
                  <summary>Tag</summary>
                  <ul >
                    <li v-for="cate in cates">
                      <details>
                        <summary @click="chooseTag(cate.name)">{{cate['name']}}</summary>
                        <ul>
                          <li @click="chooseLittleTag(child)" v-for="child in cate['childs']">>
                            <summary> {{ child }} </summary>
                          </li>

                        </ul>
                      </details>
                    </li>

                  </ul>
                </details>

              </li>

            </ul>

            <div class="flex">
              <h1 class="text-4xl font-bold ml-4 mt-4">简介</h1>
              <icon v-if="!isEditBrief&&isCreating" class="icon-[material-symbols-light--edit-square]  my-auto" @click="toggleEditBrief"></icon>
            </div>

            <div v-if="!isEditBrief" class="m-4">
              <p v-if="!isCreating">
<!--                {{res.filename}}-->
                {{bookInfo.mess}}
              </p>
              <p v-if="isCreating">
                <!--                {{res.filename}}-->
                {{bookMess}}
              </p>
            </div>
            <textarea class="m-4" v-if="isEditBrief" rows="8" @blur="toggleEditBrief" v-model="bookMess"></textarea>
          </div>
        </div>
      </div>



      <!-- 评论区 -->

    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'

import CommentCard from "../components/CommentCard.vue";
import StarRating from "../components/StarRating.vue";
import {VueDraggable} from "vue-draggable-plus";
import { useFileSystemAccess } from '@vueuse/core'
import Cookies from "js-cookie";
import {getDetail, getMyWorks, postNewBook, postNewChapter} from "@/api/api.js";
import {toast} from "vue3-toastify";
 const props = defineProps(['bid','isCreating'])
const emit = defineEmits(['closeEditWindow'])
const bkdtwd = ref(null)
const windowBlur=ref(null)
const isUploading=ref(false)
const isEditTitle=ref(false)
const isEditBrief=ref(false)
const isCreating = props.isCreating;
const chapterName = ref();
const bid = props.bid;
const userID = Cookies.get('userID');
const userName = Cookies.get('username')
const bookName = ref('书籍名称');
const bookMess = ref('简介');
const bookTag = ref();
const bookLittleTag = ref();
const bookInfo = ref({
  name: '工科数学分析',
  // cover: '../assests/books/shufen.jpg',
  cover:'./shufen.jpg',
  author: '孙玉泉',
  tag: 5,
  brief: 'sb数分',
  rank:'90'
})

onMounted(async ()=>{
  console.log()
  let res = await getDetail('张三',bid);
  console.log(res);
  bookInfo.value=res.data;
  console.log(bookInfo.value);

});
const res = useFileSystemAccess({
  types: [{
    description: 'text',
    accept: {
      'text/plain': ['.txt', '.html'],
    },
  }],
  excludeAcceptAllOption: true,
})
const res2 = useFileSystemAccess({
  types: [{
    description: 'img',
    accept: {
      'text/plain': ['.jpg', '.png'],
    },
  }],
  excludeAcceptAllOption: true,
})

async function handleCreate() {
  return new Promise((resolve, reject) => {
    res2.open().then(async () => {
      console.log(res2.file.value);
      uploadFileName.value = res2.fileName;

      const formData = new FormData();
      formData.append('name', bookName.value);
      formData.append('user_name', '张三');
      formData.append('user_id', '14');
      formData.append('tag',bookTag.value);
      formData.append('little_tag',bookLittleTag.value);
      formData.append('mess',bookMess.value);
      formData.append('image', res2.file.value); // 添加文件到 FormData

      let ares = await postNewBook(formData); // 传递 FormData 对象
      console.log(ares);
      if(ares.status==200)
      {
        toast.success('创建成功')
      }
      resolve(); // 执行成功后调用 resolve
    }).catch(error => {
      reject(error); // 执行失败时调用 reject
    });
  });
}
async function handleOpen() {
  console.log(bid);
  return new Promise((resolve, reject) => {
    res.open().then(async () => {
      console.log(res.file.value);
      uploadFileName.value = res.fileName;

      const formData = new FormData();
      formData.append('name', chapterName.value);
      formData.append('user_id', '1');
      formData.append('id', '10611');
      formData.append('file', res.file.value); // 添加文件到 FormData

      let ares = await postNewChapter(formData); // 传递 FormData 对象
      console.log(ares);
      if(ares.status==200)
      {
        toast.success('上传成功')
      }
      resolve(); // 执行成功后调用 resolve
    }).catch(error => {
      reject(error); // 执行失败时调用 reject
    });
  });
}


const uploadFileName = ref();
const cates=ref([
  {
    name:'武侠',
    childs:[
      '旧派武侠','新派武侠','古仙武侠'
    ]
  },
  {
    name:'科幻',
    childs:[
      '硬科幻','软科幻'
    ]
  },
  {
    name:'传记',
    childs:[
      '国内名人传记','世界名人传记'
    ]
  },
  {
    name:'建筑',
    childs:[
        '国内建筑','世界建筑'
    ]
  },
  {
    name:'佛教',
    childs:[

    ]
  },
  {
    name:'悬疑',
    childs:[

    ]
  },
  {
    name:'艺术',
    childs:[

    ]
  },
  {
    name:'数学',
    childs:[

    ]
  },
  {
    name:'戏剧',
    childs:[

    ]
  },
  {
    name:'游记',
    childs:[

    ]
  },
  {
    name:'职场',
    childs:[

    ]
  },
  {
    name:'健康',
    childs:[

    ]
  },
  {
    name:'摄影',
    childs:[

    ]
  },
  {
    name:'家居',
    childs:[

    ]
  },
  {
    name:'美食',
    childs:[

    ]
  },
  {
    name:'算法',
    childs:[

    ]
  },
  {
    name:'神经网络',
    childs:[

    ]
  },
  {
    name:'用户体验',
    childs:[

    ]
  },
  {
    name:'互联网',
    childs:[

    ]
  },
  {
    name:'web',
    childs:[

    ]
  },

])
function chooseTag(tag){
  bookTag.value = tag;
}
function chooseLittleTag(tag){
  bookLittleTag.value = tag;
}
function handleAdd(filename) {
  const length = files.value.length + 1
  files.value.push({
    name: filename,
    id: `${length}`
  })
}
const toggleUploading=()=>{
  isUploading.value = !isUploading.value;
};
const toggleEditTitle=()=>{
  isEditTitle.value = !isEditTitle.value;
};
const toggleEditBrief=()=>{
  isEditBrief.value = !isEditBrief.value;
};
function hideWindow() {
  bkdtwd.value.classList.add("opacity-0")
  bkdtwd.value.classList.add("translate-y-60")
  // windowBlur.value.classList.add('backdrop-blur-none')
  windowBlur.value.classList.remove('backdrop-blur-sm')
  setTimeout(() => {
    emit('closeEditWindow')
  },300)
}
function remove(index) {
  files.value.splice(index, 1)
}
setTimeout(function () {
  // windowBlur.value.classList.remove('backdrop-blur-none')
  windowBlur.value.classList.add('backdrop-blur-sm')
  bkdtwd.value.classList.remove("opacity-0")
  bkdtwd.value.classList.remove("translate-y-60")
}, 10)

</script>

<style scoped>
.window::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.gradient-blue {
  background: linear-gradient(to right, #458dcc, #898acd); /* 蓝色渐变 */
}
.txt-one {
  border: 2px solid #adadad;
  border-radius: 10px;
  position: relative;
  align-items: center;

  min-width: 300px;
  width: 300px;
  height: 30px;
  display: flex;
}

.txt-one input {
  margin-left: 3%;
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  border: none;
  width: 80%;
  outline: none;
  padding: 0 3px;
  height: 100%;
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
  z-index: 100;

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
button{
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  position: relative;
  outline: none;
  border: 0;

}
button:before {
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
button:active:before{
  transition: all 0.1s;
  background-position: left bottom;
}
.draggable-div{
  position: relative;
  width: 300px;
  transition: 0.5s;
  height: 30px;
  display: flex;
  align-items: center;
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}


</style>