<template>
  <div v-if="isCreator" class="flex w-full  h-auto min-h-[600px] bg-gray-50">
      <SideBar :show-content="isWide">

      </SideBar>
    <div class="flex" :class="{'aaa':isWide,'bbb':!isWide}">
        <RouterView :show-line="isWide" :is-wide="isWide" @edit="doEdit" @create="$emit('create')">

        </RouterView>
    </div>
  </div>
  <PosterView v-if="!isCreator">

  </PosterView>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import SideBar from "@/components/SideBar1.vue";
import PosterView from "@/views/PosterView.vue";
const props = defineProps(['isWide', 'isNormal'])

const  emit  = defineEmits(['leaveHome', 'edit','notCreator']);
const isCreator = ref(false);
function doEdit(param) {
  emit('edit', param);
}

emit('leaveHome');

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
