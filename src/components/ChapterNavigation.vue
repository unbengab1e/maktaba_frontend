<template>
  <div class="menu h-full bg-slate-300 w-1/5 rounded-r-lg flex-nowrap px-6 py-6">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab v-for="category in categories" as="template" :key="category" v-slot="{ selected }">
          <button :class="[
            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            selected
              ? 'bg-white text-blue-700 shadow'
              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
          ]">
            {{ category.name }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2 h-full">
        <TabPanel
          class="rounded-xl h-full bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
          <ul>
            <li v-for="ch in nav"><a @click="console.log(ch.chapter_id); emit('jump', ch.chapter_id, 'first')">{{
              ch.chapteDetail
                }}</a></li>
          </ul>
        </TabPanel>
        <TabPanel
          class="rounded-xl h-full bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
          <ul>
            <template v-for="tag in tags">
              <li
                v-if="tag.offset === 0 && ((tag.private && setting.showPrivate) || (!tag.private && setting.showPublic))">
                <a @click="emit('jumpTag', tag.chapter, tag.offset)">{{ tag.content }}</a>
              </li>
            </template>
          </ul>
        </TabPanel>
        <TabPanel
          class="rounded-xl h-full bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
          <ul>
            <template v-for="tag in tags">
              <li
                v-if="tag.content.length && ((tag.private && setting.showPrivate) || (!tag.private && setting.showPublic))">
                <a @click="emit('jumpTag', tag.chapter, tag.offset)">{{ tag.content }}</a>
              </li>
            </template>
          </ul>
        </TabPanel>
        <TabPanel
          class="rounded-xl h-full bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
          <ul>
            <template v-for="tag in tags">
              <li
                v-if="tag.content.length === 0 && ((tag.private && setting.showPrivate) || (!tag.private && setting.showPublic))">
                <a @click="emit('jumpTag', tag.chapter, tag.offset)">{{ tag.content
                  }}</a>
              </li>
            </template>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref } from 'vue';
import { Chapter, Setting, Tag } from '../models/book';

const nav = defineModel<Chapter[]>('nav');
const tags = defineModel<Tag[]>('tags');
const setting = defineModel<Setting>('setting');

const emit = defineEmits(['jump', 'jumpTag']);


const categories = ref({
  contents: {
    name: '目录',
    items: [
    ],
  },
  bookmarks: {
    name: '书签',
    items: [
    ],
  },
  notes: {
    name: '笔记',
    items: [
    ],
  },
  highlights: {
    name: '高亮',
    items: [
    ],
  },
})

</script>

<style scoped>
* {
  overflow: hidden;
}
</style>
