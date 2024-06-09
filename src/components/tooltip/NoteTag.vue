<template>
  <div id="note" class="h-full flex justify-center items-center flex-col gap-3 mx-0 my-auto">
    <textarea name="" id="" v-model="content" class="textarea textarea-bordered h-1/2 w-5/6"></textarea>
    <div class="flex items-center gap-1">
      <input type="checkbox" v-model="fill" class="checkbox checkbox-sm checkbox-accent">下划线
      <input type="color" ref="colorPicker" name="color" class="w-8 h-8">
      <input type="checkbox" class="toggle toggle-sm toggle-info" v-model="priv" /> 公开
      <button class="btn text-xs p-0 h-6 min-h-6 w-5 text-white btn-success" :title="props.curTag ? '更新' : '提交'"
        @click="submitNote">✔</button>
      <button :class="`btn text-xs p-0 h-6 min-h-6 w-5 text-white btn-error ${props.curTag ? '' : 'btn-disabled'}`"
        title="删除" @click="deleteNote">✘</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NoteTag',
}
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Tag } from '../../models/book';

const emit = defineEmits<{
  submitNote: [string, number, boolean, boolean],
  deleteNote: [],
}>();
const props = defineProps<{
  curTag: Tag,
}>()

const content = ref("")
const fill = ref(false)
const priv = ref(false)
const colorPicker = ref()

onMounted(() => {
  if (props.curTag) {
    content.value = props.curTag.content
    fill.value = !props.curTag.fill
    priv.value = !props.curTag.private
    colorPicker.value.value = `#${props.curTag.color.toString(16).padStart(6, '0')}`
  }
})

const submitNote = () => {
  console.log(colorPicker.value.value)
  emit('submitNote', content.value, parseInt(colorPicker.value.value.substring(1), 16), !fill.value, !priv.value);
}

const deleteNote = () => {
  emit('deleteNote');
}

</script>

<style scoped lang="scss">
input[type="color"] {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid gray;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}
</style>
