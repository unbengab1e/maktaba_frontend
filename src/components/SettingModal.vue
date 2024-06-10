<template>
  <dialog id="setting" class="modal">
    <div class="modal-box">
      <!-- <div>
        <span>背景颜色</span>
        <input type="color" v-model="setting.backgroundColor" />
      </div>
      <div>
        <span>文字颜色</span>
        <input type="color" v-model="setting.textColor" />
      </div> -->
      <div>
        <span>文字大小</span>
        <input
          type="number"
          v-model="setting.fontSize"
          min="1"
          max="100"
          class="input input-bordered input-sm"
        />
      </div>
      <div>
        <span>展示公共标签</span>
        <input
          type="checkbox"
          class="toggle toggle-success"
          v-model="setting.showPublic"
        />
      </div>
      <div>
        <span>展示私有标签</span>
        <input
          type="checkbox"
          class="toggle toggle-success"
          v-model="setting.showPrivate"
        />
      </div>
      <div>
        <span>每章为一页</span>
        <input
          type="checkbox"
          class="toggle toggle-success"
          v-model="setting.flipByChapter"
        />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="refresh">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { Setting } from "../models/book";
import Cookies from "js-cookie";

const setting = defineModel<Setting>("setting");
const emit = defineEmits<{
  refresh: [];
}>();

const refresh = () => {
  for (const key in setting.value) {
    console.log(key, setting.value[key].toString());
    Cookies.set(key, setting.value[key].toString());
  }
  emit("refresh");
};
</script>

<style scoped lang="scss">
.modal-box {
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: black;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
