<template>
    <div ref="dock"
        class="transition-all duration-300 ease-in-out flex flex-col justify-around fixed right-4 justify-self-center h-auto w-[60px] z-50 border-[1px] rounded-full backdrop-blur-md bg-base-200 bg-opacity-60 py-[6px] px-[7px] shadow-md">
        <RouterLink v-for="dockItem in dockItems" :to="dockItem['path']">
            <div
                class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md">
                <i :class="dockItem['icon']" class="h-6 w-6 m-auto"></i>
            </div>
        </RouterLink>

        <div class="w-full border-[1px] border-gray-600 my-2"></div>

        <button
            class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md"
            @click="changeTheme()">
            <i :class="theme" class="h-6 w-6 m-auto"></i>
        </button>
        <label
            class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md"
            for="my-drawer">
            <i class="icon-[fluent--navigation-location-target-20-filled] h-6 w-6 m-auto"></i>
        </label>
        <button
            class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md"
            onclick="setting.showModal()">
            <i class="icon-[material-symbols--settings] h-6 w-6 m-auto"></i>
        </button>
        <button
            class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md"
            @click="emit('addBookMark')">
            <i class="icon-[material-symbols--bookmark-add-outline-rounded] h-6 w-6 m-auto"></i>
        </button>
        <button
            class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md"
            onclick="comment.showModal()">
            <i class="icon-[mdi--comment-processing-outline] h-6 w-6 m-auto"></i>
        </button>
    </div>
</template>

<script setup>
import { addHistory, postReadingProgress } from "@/api/api";
import { computed, ref, watch } from "vue"
import { onBeforeRouteUpdate } from "vue-router";

const dockItems = ref([
    {
        icon: "icon-[material-symbols--home]",
        path: "/",
    }, {
        icon: "icon-[mingcute--fire-line]",
        path: "/Top/?cate=all"
    }, {
        icon: "icon-[mingcute--classify-2-fill]",
        path: "/Library/?cate=all"
    }, {
        icon: "icon-[mdi--bookshelf]",
        path: "/Bookshelf"
    }, {
        icon: "icon-[lucide--circle-plus]",
        path: "/Creator"
    },])
const theme = computed(() => {
    return isDark.value ? 'icon-[ph--moon-bold]' : 'icon-[ph--sun-bold]';
})
const props = defineProps(['showDock', 'bid', 'chapter'])
const showDock = computed(() => props.showDock)
const dock = ref()
const isDark = ref(false)
const emit = defineEmits('changeTheme', 'addBookMark');

watch(showDock, (newShow, oldShow) => {
    if (newShow) {
        dock.value.classList.remove('-translate-x-32')
        dock.value.classList.remove('opacity-0')
    } else {
        dock.value.classList.add('-translate-x-32')
        dock.value.classList.add('opacity-0')
    }
})

function changeTheme() {
    isDark.value = !isDark.value
    emit('changeTheme', isDark.value)
}

onBeforeRouteUpdate(async (to, from, next) => {
    await postReadingProgress(props.bid, props.chapter)
    await addHistory(props.bid)
    next(); // 继续导航
});
</script>
