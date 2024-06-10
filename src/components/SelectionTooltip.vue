<template>
  <div
    ref="tooltip"
    id="tooltip"
    :class="direction ? 'up' : 'down'"
    @mouseup.stop=""
  >
    <component
      :is="mode"
      :user_id="user_id"
      :selection="props.selection"
      :curTag="props.curTag"
      @close="close"
      @note="test"
      @submitNote="submitNote"
      @deleteNote="deleteNote"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import FunctionMenu from "./tooltip/FunctionMenu.vue";
import NoteTag from "./tooltip/NoteTag.vue";
import { addBookTag, deleteBookTag, updateBookTag } from "../api/api";
import { toast } from "vue3-toastify";
import { Tag } from "../models/book";

const props = defineProps<{
  selection: string;
  direction: boolean;
  bid: number;
  chapter: number;
  offset: number;
  curTag: Tag;
  user_id: string;
}>();
const modeStr = defineModel<string>("mode");
const emit = defineEmits<{
  rerenderTag: [];
  updateNotes: [];
}>();

const tooltip = ref();
const mode = computed(() => {
  if (modeStr.value === "FunctionMenu") {
    return FunctionMenu;
  } else if (modeStr.value === "NoteTag") {
    return NoteTag;
  }
});

const close = () => {
  tooltip.value.style.opacity = "0";
  tooltip.value.style.zIndex = "0";
  setTimeout(() => {
    modeStr.value = "FunctionMenu";
  }, 500);
};

const test = () => {
  modeStr.value = "NoteTag";
};

const submitNote = (
  content: string,
  color: number,
  fill: boolean,
  priv: boolean
) => {
  if (props.curTag) {
    updateBookTag(props.curTag.id, props.user_id, content, color, fill, priv)
      .then((res) => {
        if (res.data.status_code === 200) {
          toast.success("更新成功");
          emit("updateNotes");
        } else {
          toast.error(`更新失败：无权限`);
        }
      })
      .catch((e) => {
        toast.error(`更新失败：${e}`);
      });
  } else {
    addBookTag(
      props.user_id,
      props.bid,
      props.chapter,
      props.offset,
      props.selection.length,
      content,
      color,
      fill,
      priv
    )
      .then(() => {
        toast.success("添加成功");
        emit("updateNotes");
      })
      .catch((e) => {
        toast.error(`添加失败：${e}`);
      });
  }
  close();
};

const deleteNote = () => {
  deleteBookTag(props.curTag.id, props.user_id, props.bid, props.chapter)
    .then((res) => {
      if (res.data.status_code === 200) {
        toast.success("删除成功");
        emit("updateNotes");
      } else {
        toast.error(`删除失败：无权限`);
      }
    })
    .catch((e) => {
      toast.error(`删除失败：${e}`);
    });
  close();
};
</script>

<style scoped lang="scss">
@keyframes popup {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  80% {
    opacity: 0.95;
    transform: scale(1.005);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popout {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}

#tooltip {
  position: absolute;
  top: 0;
  display: none;
  font-size: 14px;
  color: black;
  background: #f9f9f9;
  border-radius: 5px;
  width: 240px;
  transform: translateX(-50%);
  height: 150px;
  box-shadow: 0 16px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation: popup 0.2s ease-in-out 0s 1;
  opacity: 0;
  z-index: 99;

  &::before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    background: inherit;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &.down::before {
    bottom: -8px;
  }

  &.up::before {
    top: -8px;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
