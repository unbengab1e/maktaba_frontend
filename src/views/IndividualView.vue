<template>
  <div class="flex w-full h-auto min-h-[1000px] bg-gray-50">
    <!--    <div class="flex w-[200px] h-full ">-->
    <SideBar :show-content="isWide">

    </SideBar>
    <!--    </div>-->
    <div class="flex flex-grow h-full">
      <RouterView :show-line="isWide">

      </RouterView>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import NormalBookCard from '@/components/NormalBookCard.vue';
import SideBar from "@/components/SideBar2.vue";
const props = defineProps(['isWide', 'isNormal'])
const emit=defineEmits(['leaveHome'])
emit('leaveHome')


</script>


<style>

</style>
