<template>
  <div class="h-full flex flex-grow" @mouseup="setTooltip">
    <SelectionTooltip :selection="selection" :direction="changeDirection" />
    <ModalDialog />
    <div id="book" class="m-auto">
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import SelectionTooltip from './SelectionTooltip.vue'
import ModalDialog from './ModalDialog.vue';
import { Chapter, findPageByOffset } from '../models/book';

const chapter = defineModel<Chapter>('chapter');
// const tags 

let tooltip: HTMLElement;
// 选中的文字
const selection: Ref<String> = ref("");
// tooltip 箭头指向
const changeDirection = ref(false);

onMounted(() => {
  tooltip = document.getElementById('tooltip')!;
})

// 选中文字时，设置 tooltip 位置
function setTooltip() {
  const sel = window.getSelection();
  if (sel == null || sel!.type !== 'Range') {
    tooltip.style.opacity = '0';
    tooltip.style.zIndex = '0';
    return;
  }
  tooltip.style.opacity = '1';
  tooltip.style.zIndex = '1';
  tooltip.style.display = 'block';
  selection.value = sel.toString();
  const rect = sel!.getRangeAt(0).getBoundingClientRect();
  const { posX, posY } = getHtmlPosition(rect);
  tooltip.style.left = `${posX}px`;
  tooltip.style.top = `${posY}px`;
}

function getPageSize() {
  let ele: HTMLElement = document.querySelector('.my-page:not([style*="display: none"]')!;
  return {
    width: ele.clientWidth,
    height: ele.clientHeight,
    left: ele.offsetLeft,
    top: ele.offsetTop,
    scrollTop: ele.scrollTop,
  }
}

// 选中区域 -> tooltip 位置
function getHtmlPosition(rect: DOMRect) {
  const size = getPageSize();
  // 选中区域 Y 轴下端
  let posY = rect.bottom;
  // 选中区域 X 轴中点
  let posX = rect.left + rect.width / 2;
  // 选中区域下部空间不足
  if (size.height - rect.height < 150) {
    changeDirection.value = true;
    posY = rect.top + 16 + size.top;
  } else if (posY < size.height - 150 + size.top) {
    changeDirection.value = true;
    posY = posY + 16 + size.top;
  } else {
    posY = posY - rect.height - 166 + size.top;
    changeDirection.value = false;
  }
  return { posX, posY } as any;
}

</script>

<style scoped lang="scss"></style>
