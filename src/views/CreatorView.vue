<template>
  <div v-if="isCreator" class="flex w-full  h-auto min-h-[600px] bg-gray-50">
      <SideBar :show-content="isWide">

      </SideBar>
    <div class="flex" :class="{'aaa':isWide,'bbb':!isWide}">
        <RouterView :show-line="isWide" :is-wide="isWide" @edit="doEdit" @create="$emit('create')">

        </RouterView>
    </div>
  </div>
  <PosterView v-if="!isCreator" @beCreator="beCreator">

  </PosterView>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import SideBar from "@/components/SideBar1.vue";
import PosterView from "@/views/PosterView.vue";
import {getIsAuthor} from "@/api/api.js";
import Cookies from "js-cookie";
const props = defineProps(['isWide', 'isNormal'])

const  emit  = defineEmits(['leaveHome', 'edit','notCreator']);
const isCreator = ref(false);
const username = Cookies.get('username')
function doEdit(param) {
  emit('edit', param);
}
function beCreator()
{
  isCreator.value=true;
}
emit('leaveHome');
onMounted(async () => {
  let res = await getIsAuthor(username)
  console.log(res);
  if(res.data.message=='是作者')
    isCreator.value = true;
  else
    isCreator.value = false;

  //console.log(books.value.length)
})
onMounted(()=>{
  if(!isCreator.value){
    emit('notCreator')
  }
})


</script>


<style scoped>
.aaa{
  width:calc(100% - 200px);
}
.bbb{
  width: calc(100% - 50px);
}

</style>
