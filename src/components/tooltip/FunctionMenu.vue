<template>
  <div id="menu">
    <Icon icon="material-symbols:file-copy" @mouseup.stop="copy" />
    <Icon icon="bi:pencil-square" @mouseup.stop="emit('note')" />
    <Icon icon="ph:highlighter-fill" @mouseup.stop="emit('note')" />
    <Icon icon="hugeicons:search-list-01" />
    <Icon icon="mdi:search-web" @click="searchWeb" />
    <Icon icon="streamline:dictionary-language-book-solid" @click="searchDict" />
    <Icon icon="material-symbols:text-to-speech-rounded" @click="speech" />
    <Icon icon="material-symbols:translate-rounded" @click="translate" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'FunctionMenu',
}
</script>

<script setup lang="ts">
import copyText from 'copy-text-to-clipboard';
import { Icon } from '@iconify/vue';
import { toast } from 'vue3-toastify';

const props = defineProps<{
  selection: string,
}>();

const emit = defineEmits<{
  note: [],
  close: [],
}>();

const synth = window.speechSynthesis;

function copy() {
  if (copyText(props.selection)) {
    toast.success("复制成功");
  } else {
    toast.error("复制失败");
  }
  emit('close');
}

function searchWeb() {
  window.open(`https://www.baidu.com/s?wd=${encodeURI(props.selection)}`)
}

function searchDict() {
  window.open(`https://cn.bing.com/dict/search?q=${encodeURI(props.selection)}`)
}

function translate() {
  window.open(`https://translate.google.com/?sl=auto&tl=zh-CN&text=${encodeURI(props.selection)}&op=translate`)
}

function speech() {
  // function populateVoiceList() {
  //   voices = synth.getVoices().sort(function (a, b) {
  //     const aname = a.name.toUpperCase();
  //     const bname = b.name.toUpperCase();

  //     if (aname < bname) {
  //       return -1;
  //     } else if (aname == bname) {
  //       return 0;
  //     } else {
  //       return +1;
  //     }
  //   });
  //   const selectedIndex =
  //     voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  //   voiceSelect.innerHTML = "";

  //   for (let i = 0; i < voices.length; i++) {
  //     const option = document.createElement("option");
  //     option.textContent = `${voices[i].name} (${voices[i].lang})`;

  //     if (voices[i].default) {
  //       option.textContent += " -- DEFAULT";
  //     }

  //     option.setAttribute("data-lang", voices[i].lang);
  //     option.setAttribute("data-name", voices[i].name);
  //     voiceSelect.appendChild(option);
  //   }
  //   voiceSelect.selectedIndex = selectedIndex;
  // }

  // populateVoiceList();

  // if (speechSynthesis.onvoiceschanged !== undefined) {
  //   speechSynthesis.onvoiceschanged = populateVoiceList;
  // }

  if (synth.speaking) {
    toast.error("正在播放中");
    return;
  }

  if (props.selection !== "") {
    const utterThis = new SpeechSynthesisUtterance(props.selection);

    utterThis.onend = function (event) {
      toast.success("播放结束");
    };

    utterThis.onerror = function (event) {
      toast.error("服务出现错误");
    };

    // const selectedOption =
    //   voiceSelect.selectedOptions[0].getAttribute("data-name");

    // for (let i = 0; i < voices.length; i++) {
    //   if (voices[i].name === selectedOption) {
    //     utterThis.voice = voices[i];
    //     break;
    //   }
    // }
    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
    utterThis.lang = 'zh-CN';
    synth.speak(utterThis);
  }
}
</script>

<style scoped lang="scss">
#menu {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: stretch;
  margin: 8%;
  cursor: pointer;
}

svg {
  padding: 4%;
  margin: 0.5%;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  transition: 0.2s;

  &:hover {
    background-color: #ddd;
  }
}
</style>
