<template>
    <div ref="dock" class="transition-all duration-300 ease-in-out flex flex-col justify-around fixed left-4 justify-self-center h-auto w-[60px] z-50 border-[1px] rounded-full bg-white bg-opacity-50 py-[6px] px-[7px] shadow-md" style="backdrop-filter: var(--mak-glass-2);">
        <RouterLink v-for="dockItem in dockItems" :to="dockItem['path']">
            <div class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md bg-white bg-opacity-50">
                <i :class="dockItem['icon']" class="h-6 w-6 m-auto"></i>
            </div>
        </RouterLink>

        <div class="w-full border-[1px] border-gray-600 my-2"></div>

        <button class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md bg-white bg-opacity-50" @click="changeTheme()">
            <i :class="theme" class="h-6 w-6 m-auto"></i>
        </button>
        <button class="transition w-full aspect-square border-[1px] rounded-full flex my-1 hover:scale-125 hover:bg-gray-300 shadow-md bg-white bg-opacity-50">
            <i class="icon-[material-symbols--settings] h-6 w-6 m-auto"></i>
        </button>
    </div>
</template>

<script setup>
import { computed, ref,watch } from "vue"
import Cookies from "js-cookie";
import { get } from "@vueuse/core";
const uname = ref(Cookies.get('username'))
const dockItems = ref([
    {
        icon: "icon-[material-symbols--home]",
        path:"/",
    },{
        icon: "icon-[mingcute--fire-line]",
        path:"/Top/?cate=all"
    },{
        icon: "icon-[mingcute--classify-2-fill]",
        path:"/Library/?cate=all"
    },{
        icon: "icon-[mdi--bookshelf]",
        path:"/Bookshelf"
    },{
        icon: "icon-[lucide--circle-plus]",
        path:"/Creator/CreatorIndex/?uname="+uname.value
    },])
const isDark = ref(false)
const theme = computed(() => {
    return isDark.value ? 'icon-[ph--moon-bold]' : 'icon-[ph--sun-bold]';
})
const props=defineProps(['showDock','changeUserName'])
const showDock = computed(() => props.showDock)
const dock = ref()
const changeUserName = computed(() => props.changeUserName)

watch(changeUserName, () => {
    uname.value=Cookies.get('username')
})

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
}


</script>