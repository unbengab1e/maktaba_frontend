<template>
  <div class="fixed drawer h-screen w-screen">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div
        ref="bookReader"
        class="h-full flex flex-row justify-stretch items-stretch overflow-hidden"
        :style="`font-size: ${setting.fontSize}px;`"
        id="book-reader"
        @mouseup="setTooltip"
      >
        <SelectionTooltip
          :selection="selection"
          :bid="bid"
          :chapter="curChapter.chapter"
          :offset="selectionOffset"
          :direction="changeDirection"
          v-model:mode="modeStr"
          :curTag="curTag"
          :user_id="user_id"
          @updateNotes="renderAllTag()"
        />
        <ModalDialog />
        <SettingModal v-model:setting="setting" @refresh="refresh()" />
        <CommentModal
          :bid="bid"
          :chapter="curChapter.chapter"
          :offset="curOffset"
        />
      </div>
    </div>
    <div
      class="fixed right-0 w-auto h-[100vh] flex flex-col justify-center z-50"
    >
      <ReaderDock
        @changeTheme="changeTheme"
        @addBookMark="addBookMark"
        @leave="leave"
        :bid="bid"
        :chapter="curChapter.chapter"
        v-model:comments="comments"
      />
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ChapterNavigation
        v-model:nav="nav"
        v-model:tags="tags"
        v-model:setting="setting"
        @jump="renderBook"
        @jumpTag="jumpTag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChapterNavigation from "../components/ChapterNavigation.vue";
import { computed, onBeforeMount, onMounted, reactive, Ref, ref } from "vue";

// import text from '../assets/UDHR.txt?raw'
import { PageFlip } from "page-flip";
import {
  addBookTag,
  addHistory,
  getBookTag,
  getChapter,
  getComment,
  getIndex,
  postReadingProgress,
  updateTimeForEveryBook,
} from "../api/api";
import { Icon } from "@iconify/vue";
import { Chapter, findPageByOffset, Setting, Tag } from "../models/book";
import { useRoute } from "vue-router";
import SelectionTooltip from "../components/SelectionTooltip.vue";
import ModalDialog from "../components/ModalDialog.vue";
import { toast } from "vue3-toastify";
import Cookies from "js-cookie";
import SettingModal from "../components/SettingModal.vue";
import CommentModal from "../components/CommentModal.vue";
import ReaderDock from "@/components/ReaderDock.vue";

let route = useRoute();
let bookName = route.query.bookName as string;
let bid = parseInt(route.query.bid as string);
let chapter = parseInt(route.query.chapter as string);
let offset = parseInt(route.query.offset as string);

let tooltip: HTMLElement;
// 选中的文字
const selection: Ref<string> = ref("");
// tooltip 箭头指向
const changeDirection = ref(false);
// 选中文字偏移量
const selectionOffset: Ref<number> = ref(0);
const curOffset: Ref<number> = ref(0);
const comments: Ref<Comment[]> = ref([]);

const curChapter = reactive<Chapter>({
  chapter,
  chapterDetail: "",
  content: "",
  pageNum: {
    pre: 0,
    cur: 0,
    nxt: 0,
  },
  pages: [],
  words: [],
});
const setting = reactive<Setting>({
  // backgroundColor: '#faebd7',
  flipByChapter: false,
  fontSize: 18,
  showPrivate: true,
  showPublic: true,
  // textColor: '#000000',
});
const nav: Ref<any[]> = ref([]);
const bookReader: Ref<HTMLElement | null> = ref(null);
const modeStr = ref("FunctionMenu");
const curTag = ref();
const isDark = ref(false);

let tags: Ref<Tag[]> = ref([]);
let user_id: string;
let username: string;
let pageFlip: PageFlip; // 分页对象
let width = window.innerWidth * 0.36; // 单页宽度
let height = window.innerHeight * 0.9; // 单页高度

const getRange = (paginator: HTMLElement, w: number, h: number): Range => {
  let range;
  let textNode: HTMLElement;
  let offset: number;
  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(w, h);
    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    // Use WebKit-proprietary fallback method
    range = document.caretRangeFromPoint(w, h);
    textNode = range.startContainer;
    offset = range.startOffset;
  } else {
    // Neither method is supported, do nothing
  }
  const rng = document.createRange();
  rng.setStart(paginator, 0);
  rng.setEnd(textNode, offset);
  return rng;
};

const getPage = (
  paginator: HTMLElement,
  w: number,
  h: number
): DocumentFragment | null => {
  const res = getRange(paginator, w, h).extractContents();
  if (res.childNodes.length === 0) {
    return null;
  }
  return res;
};

const renderChapter = (chapterDetail: string, content: string): number => {
  if (setting.flipByChapter) {
    const page = document.createElement("div");
    page.className = "my-page";
    page.innerText = content;
    if (isDark.value) {
      page.classList.add("black-page");
    }
    curChapter.words.push(content.length);
    const pageTitle = document.createElement("div");
    pageTitle.className = "page-title";
    pageTitle.innerText = chapterDetail;
    const pageNumber = document.createElement("div");
    pageNumber.className = "page-number";
    pageNumber.innerText = bookName;
    page.appendChild(pageTitle);
    page.appendChild(pageNumber);
    curChapter.pages.push(page);
    return 1;
  } else {
    // padding: 4% -> 1 - padding * 4 = 0.84
    const w = width * 0.84;
    // padding: 4% -> padding * 4 = 0.16
    const h = height - width * 0.16;
    let paginator: HTMLElement = document.createElement("div");
    paginator.style.columns = `${w}px auto`;
    paginator.style.columnFill = "auto";
    paginator.style.columnGap = "0";
    paginator.style.fontSize = `${setting.fontSize}px`;
    paginator.style.height = `${h}px`;
    paginator.style.position = "absolute";
    paginator.style.textAlign = "justify";
    paginator.style.zIndex = "999";
    paginator.innerText = content;

    let title = document.createElement("h1");
    title.style.textAlign = "center";
    title.style.fontSize = "24px";
    title.style.fontWeight = "700";
    title.style.margin = "2.5%";

    title.innerText = chapterDetail;
    title.style.userSelect = "none";
    paginator.insertBefore(title, paginator.firstChild);
    bookReader.value!.appendChild(paginator);

    let pageContents: DocumentFragment[] = [];

    // https://drafts.csswg.org/css-multicol-1/#cw
    // The reason for making column-width somewhat flexible is to achieve scalable designs that can fit many screen sizes. To set an exact column width, the column gap and the width of the multicol container (assuming horizontal text) must also be specified.
    paginator.style.width = `16777200px`;
    let pageNum = 0;
    while (true) {
      let p = getPage(paginator, w, h);
      if (p === null) {
        break;
      } else {
        pageContents.push(p);
        pageNum++;
      }
    }

    // make page
    if (pageNum % 2 == 1) {
      pageContents.push(document.createDocumentFragment());
      pageNum++;
    }

    bookReader.value!.removeChild(paginator);

    pageContents.forEach((p, i) => {
      const page = document.createElement("div");
      page.className = "my-page";
      page.appendChild(p);
      if (isDark.value) {
        page.classList.add("black-page");
      }
      curChapter.words.push(page.innerText.length);

      const pageTitle = document.createElement("div");
      pageTitle.className = "page-title";
      if (i % 2 === 1) {
        pageTitle.innerText = chapterDetail;
      } else {
        pageTitle.innerText = bookName;
      }
      const pageNumber = document.createElement("div");
      pageNumber.className = "page-number";
      pageNumber.innerText = (i + 1).toString();
      page.appendChild(pageTitle);
      page.appendChild(pageNumber);
      curChapter.pages.push(page);
    });
    return pageNum;
  }
};

const resetPageFlipProperties = () => {
  // 取消所有事件
  pageFlip.ui.removeHandlers();
  // 重写角落检测方法
  pageFlip.flipController.isPointOnCorners = (globalPos): boolean => {
    const rect = pageFlip.flipController.getBoundsRect();
    const pageWidth = rect.pageWidth;
    const operatingDistance = pageWidth * 0.075;
    const bookPos = pageFlip.flipController.render.convertToBook(globalPos);
    return (
      bookPos.x > 0 &&
      bookPos.y > 0 &&
      bookPos.x < rect.width &&
      bookPos.y < rect.height &&
      (bookPos.x < operatingDistance ||
        bookPos.x > rect.width - operatingDistance) &&
      (bookPos.y < operatingDistance ||
        bookPos.y > rect.height - operatingDistance)
    );
  };
  // 重写拖动检测：仅拖动初始点在角落中可翻页
  pageFlip.ui.onMouseDown = (e: MouseEvent): void => {
    if (pageFlip.ui.checkTarget(e.target)) {
      const pos = pageFlip.ui.getMousePos(e.clientX, e.clientY);
      if (pageFlip.flipController.isPointOnCorners(pos)) {
        pageFlip.ui.app.startUserTouch(pos);
        // 拖动时不选中文字
        e.preventDefault();
      }
    }
  };
  // 使事件处理器生效
  pageFlip.ui.setHandlers();
};

const createPageFlip = (pages, startPage: number) => {
  const book = document.createElement("div");
  book.id = "book";
  book.className = "m-auto";
  pageFlip?.on("flip", () => {});

  pageFlip = new PageFlip(book, {
    startPage,
    width: setting.flipByChapter ? width * 2 : width,
    height: setting.flipByChapter ? height * 0.8 : height,
    // size: 'stretch',
    // usePortrait: false,
    // useMouseEvents: false,
    flippingTime: 500, // 翻页速度
    // showPageCorners: false,
    disableFlipByClick: true,
  });
  pageFlip.loadFromHTML(pages);
  resetPageFlipProperties();
  bookReader.value?.appendChild(book);

  pageFlip.on("flip", async (e) => {
    if (e.data < curChapter.pageNum.pre) {
      curChapter.chapter--;
      await renderBook(curChapter.chapter, "last");
    } else if (e.data >= curChapter.pageNum.pre + curChapter.pageNum.cur) {
      curChapter.chapter++;
      renderBook(curChapter.chapter, "first");
    }
  });
};

async function loadBookIndex(bid: number) {
  getIndex(bid).then((response) => {
    if (response.status === 200 && response.data.status_code === 200) {
      nav.value = response.data.message;
    }
  });
}

async function loadBookTag(user_id: string, bid: number, chapter: number) {
  return new Promise<void>((resolve, reject) => {
    getBookTag(user_id, bid, chapter)
      .then((response) => {
        if (response.status === 200 && response.data.status_code === 200) {
          tags.value = response.data.message;
          resolve();
        }
      })
      .catch(() => {
        reject();
      });
  });
}

function loadChapter(bid: number, chapter: number): Promise<number> {
  return new Promise((resolve, reject) => {
    getChapter(bid, chapter).then((response) => {
      if (response.status === 200) {
        if (response.data.status_code === 200) {
          const msg = response.data.message[0];
          if (curChapter.chapter === chapter) {
            curChapter.chapterDetail = msg.chapteDetail;
            curChapter.content = msg.content;
          }
          resolve(renderChapter(msg.chapteDetail, msg.content));
        }
      }
    });
  });
  // return 0;
}

const turnToPageByOffset = (offset: number) => {
  pageFlip.turnToPage(findPageByOffset(curChapter, offset));
};

async function renderBook(chapter: number, offset: number | "last" | "first") {
  const book = document.getElementById("book")!;
  let before = curChapter.pages;
  curChapter.pages.length = 0;
  curChapter.words.length = 0;
  curChapter.chapter = chapter;

  if (chapter > 1) {
    curChapter.pageNum.pre = await loadChapter(bid, chapter - 1);
  } else {
    curChapter.pageNum.pre = 0;
  }
  curChapter.pageNum.cur = await loadChapter(bid, chapter);
  if (chapter < nav.value.length) {
    curChapter.pageNum.nxt = await loadChapter(bid, chapter + 1);
  }
  before.forEach((e) => e.remove());

  pageFlip.destroy();
  if (offset === "first") {
    offset = curChapter.pageNum.pre;
  } else if (offset === "last") {
    offset = curChapter.pageNum.pre + curChapter.pageNum.cur - 1;
  } else if (offset !== undefined) {
    offset = findPageByOffset(curChapter, offset);
  }
  console.log(curChapter, offset)

  createPageFlip(curChapter.pages, offset);

  await renderAllTag();
}

function renderTag(tag: Tag) {
  let range = document.createRange();
  const pageIndex = findPageByOffset(curChapter, tag.offset);
  // wrong
  let page = curChapter.pages[pageIndex]!;

  let startNode,
    endNode,
    startOffset = tag.offset,
    endOffset;
  for (let index = curChapter.pageNum.pre; index < pageIndex; index++) {
    startOffset -= curChapter.words[index];
  }

  // bookmark
  if (tag.length === 0) {
    const mark = document.createElement("span");
    mark.className =
      "h-8 w-8 icon-[material-symbols--bookmark] cursor-pointer absolute";
    mark.style.right = "4px";
    mark.style.top = "-4px";
    page.prepend(mark);
    tag.dom = mark;
    if (
      (tag.private && setting.showPrivate) ||
      (!tag.private && setting.showPublic)
    ) {
      mark.classList.add("text-red-400");
      mark.addEventListener("click", function () {
        setTooltipByRect(this.getBoundingClientRect());
        modeStr.value = "NoteTag";
        curTag.value = tag;
      });
    } else {
      mark.classList.add("text-transparent");
    }
    mark.addEventListener("mouseup", function (e) {
      e.stopPropagation();
    });
  } else {
    page.childNodes.forEach((e) => {
      if (e.nodeType === Node.TEXT_NODE || e.nodeName === "SPAN") {
        if (!startNode) {
          if (startOffset < e.textContent!.length) {
            startNode = e;
            endOffset = startOffset + tag.length;
          } else {
            startOffset -= e.textContent!.length;
          }
        }
        if (startNode && !endNode) {
          if (endOffset <= e.textContent!.length) {
            endNode = e;
          } else {
            endOffset -= e.textContent!.length;
          }
        }
      }
    });

    if (startNode && endNode) {
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);

      if (startNode.nodeType === Node.TEXT_NODE) {
        const bar = startNode.splitText(startOffset);
        let newNode = document.createElement("span");

        if (
          (tag.private && setting.showPrivate) ||
          (!tag.private && setting.showPublic)
        ) {
          newNode.addEventListener("click", function () {
            const sel = window.getSelection()!;
            setTooltipBySelection(sel);
            modeStr.value = "NoteTag";
            curTag.value = tag;
          });
          const colorStr = `#${tag.color.toString(16).padStart(6, "0")}`;
          if (tag.fill) {
            newNode.style.backgroundColor = colorStr;
          } else {
            newNode.style.textDecoration = `underline ${colorStr}`;
          }
        }
        newNode.addEventListener("mouseup", function (e) {
          e.stopPropagation();
        });
        tag.dom = newNode;
        newNode.className = "tag";
        newNode.append(range.extractContents());
        newNode.style.display = "inline";
        page.insertBefore(newNode, bar);
      }
    } else {
      toast.error("未找到指定偏移量和长度对应的文本区域");
    }
  }
}

const renderAllTag = async () => {
  tags.value.forEach((e) => {
    e.dom?.parentNode?.replaceChild(
      document.createTextNode(e.dom.innerText),
      e.dom
    );
  });
  await loadBookTag(user_id, bid, curChapter.chapter);
  tags.value.forEach((e) => {
    renderTag(e);
  });
};

const jumpTag = (chapter, offset) => {
  renderBook(chapter, offset);
};

const getCurrentPageOffset = () => {
  let offset = 0;
  const pageNow = getCurrentLeftPage();
  const pageIndex = Array.prototype.indexOf.call(
    pageNow!.parentElement!.children,
    pageNow
  );
  for (let index = curChapter.pageNum.pre; index < pageIndex; index++) {
    offset += curChapter.words[index];
  }
  return offset;
};

const refresh = () => {
  const offset = getCurrentPageOffset();
  renderBook(curChapter.chapter, offset);
};

const changeTheme = (dark) => {
  // refresh();
  isDark.value = dark;
  let pages = document.querySelectorAll(".my-page");
  if (dark) {
    bookReader.value.classList.add("black-page");
    pages.forEach((e) => {
      e.classList.add("black-page");
    });
  } else {
    bookReader.value.classList.remove("black-page");
    pages.forEach((e) => {
      e.classList.remove("black-page");
    });
  }
};

const addBookMark = () => {
  if (getCurrentLeftPage().firstChild.nodeName === "SPAN") {
    toast.error("当前页面已有书签");
  } else {
    addBookTag(
      user_id,
      bid,
      curChapter.chapter,
      getCurrentPageOffset(),
      0,
      "",
      0,
      true,
      true
    )
      .then(() => {
        toast.success("添加成功");
        renderAllTag();
      })
      .catch((e) => {
        toast.error(`添加失败：${e}`);
      });
  }
};

const leave = async () => {
  const duration = Date.now() - Cookies.get("startTime");
  await postReadingProgress(
    user_id,
    bid,
    curChapter.chapter,
    getCurrentPageOffset()
  );
  await addHistory(bid, username, duration);
  await updateTimeForEveryBook(user_id, bid, duration);
};

window.addEventListener("load", () => {
  Cookies.set("startTime", Date.now());
});
window.addEventListener("beforeunload", leave);

const parseSetting = () => {
  for (const key in setting) {
    if (Cookies.get(key) !== undefined) {
      if (typeof setting[key] === "number") {
        setting[key] = parseFloat(Cookies.get(key));
      } else if (typeof setting[key] === "boolean") {
        setting[key] = Cookies.get(key) === "true" ? true : false;
      } else {
        setting[key] = Cookies.get(key);
      }
    }
  }
};

onMounted(async () => {
  user_id = Cookies.get("user_id");
  username = Cookies.get("username");
  parseSetting();
  createPageFlip([], 0);
  tooltip = document.getElementById("tooltip")!;
  await loadBookIndex(bid);
  await renderBook(chapter, offset);
});

// 更改大小后刷新整个页面
window.addEventListener("resize", () => {
  width = window.innerWidth * 0.36;
  height = window.innerHeight * 0.9;
  location.reload();
});

// 键盘翻页
document.addEventListener("keydown", (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowLeft":
    case "ArrowUp":
    case "PageUp":
      // case 'k':
      if (pageFlip.render.orientation === "portrait") {
        pageFlip.turnToPrevPage("top");
      } else {
        pageFlip.flipPrev("top");
      }
      break;
    case "Enter":
    case "ArrowRight":
    case "ArrowDown":
    case "PageDown":
      // case 'j':
      pageFlip.flipNext("bottom");
      break;
    default:
      break;
  }
});

function getRangeOffset(range: Range) {
  let res = 0;
  const curPage = range.startContainer.parentElement!;
  const pageIndex = curChapter.pages.indexOf(curPage);
  for (let index = curChapter.pageNum.pre; index < pageIndex; index++) {
    res += curChapter.words[index];
  }
  for (const e of curPage.childNodes) {
    if (e.nodeType === Node.TEXT_NODE || e.nodeName === "SPAN") {
      if (e !== range.startContainer) {
        res += e.textContent!.length;
      } else {
        res += range.startOffset;
        break;
      }
    }
  }
  return res;
}

// 选中文字时，设置 tooltip 位置
function setTooltip() {
  const sel = window.getSelection();
  if (sel == null || sel!.type !== "Range") {
    tooltip.style.opacity = "0";
    tooltip.style.zIndex = "0";
    setTimeout(() => {
      modeStr.value = "FunctionMenu";
      curTag.value = null;
    }, 500);
    return;
  }
  selection.value = sel.toString();
  setTooltipBySelection(sel);
}

function setTooltipBySelection(sel: Selection) {
  const range = sel!.getRangeAt(0);
  selectionOffset.value = getRangeOffset(range);
  const rect = range.getBoundingClientRect();
  setTooltipByRect(rect);
}

function setTooltipByRect(rect: DOMRect) {
  const { posX, posY } = getHtmlPosition(rect);
  tooltip.style.opacity = "1";
  tooltip.style.zIndex = "1";
  tooltip.style.display = "block";
  tooltip.style.left = `${posX}px`;
  tooltip.style.top = `${posY}px`;
  tooltip.style.left = `${posX}px`;
  tooltip.style.top = `${posY}px`;
}

const getCurrentLeftPage = (): HTMLElement => {
  return document.querySelector('.my-page:not([style*="display: none"]')!;
};

function getPageSize() {
  const ele = getCurrentLeftPage();
  return {
    width: ele.clientWidth,
    height: ele.clientHeight,
    left: ele.offsetLeft,
    top: ele.offsetTop,
    scrollTop: ele.scrollTop,
  };
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

<style lang="scss">
* {
  font-family: "Noto Serif SC", serif;
}

// html:has(.drawer-toggle:checked),
// html:has(.modal:checked)
// {
//   scrollbar-gutter: auto;
// }

html::-webkit-scrollbar {
  display: none;
}

#book-reader {
  background-color: antiquewhite;
  transition: 0.1s;
}

.black-page {
  background-color: rgb(38, 38, 40) !important;
  color: rgb(208, 211, 216) !important;
  transition: 0.1s;
}

.my-page {
  /* text-align: center; */
  padding: 4%;
  background-color: antiquewhite;
  text-align: justify;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &.--left {
    border-radius: 0 6px 3px 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5),
      inset -6px 0 30px -6px rgba(0, 0, 0, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2),
      -5px 5px 0 0px floralwhite, -6px 6px 1px 0px rgba(0, 0, 0, 0.2),
      -11px 11px 0 0px floralwhite, -12px 12px 2px 0px rgba(0, 0, 0, 0.2);
  }

  &.--right {
    border-radius: 6px 0 0 3px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5),
      inset 12px 0 30px -6px rgba(0, 0, 0, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2),
      5px 5px 0 0px floralwhite, 6px 6px 1px 0px rgba(0, 0, 0, 0.2),
      11px 11px 0 0px floralwhite, 12px 12px 2px 0px rgba(0, 0, 0, 0.2);
  }

  &.black-page.--left {
    border-radius: 0 6px 3px 0;
    box-shadow: 0 0 20px 0 rgba(208, 211, 216, 0.5),
      inset -6px 0 30px -6px rgba(208, 211, 216, 0.2),
      0 1px 1px rgba(208, 211, 216, 0.1), -5px 5px 0 0px black,
      -6px 6px 1px 0px rgba(208, 211, 216, 0.2), -11px 11px 0 0px black,
      -12px 12px 2px 0px rgba(208, 211, 216, 0.2);
  }

  &.black-page.--right {
    border-radius: 6px 0 0 3px;
    box-shadow: 0 0 20px 0 rgba(208, 211, 216, 0.5),
      inset 12px 0 30px -6px rgba(208, 211, 216, 0.2),
      0 1px 1px rgba(208, 211, 216, 0.1), 5px 5px 0 0px black,
      6px 6px 1px 0px rgba(208, 211, 216, 0.2), 11px 11px 0 0px black,
      12px 12px 2px 0px rgba(208, 211, 216, 0.2);
  }

  .page-title,
  .page-number {
    color: lighten(black, 50%);
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    user-select: none;
  }

  .page-title {
    top: 2%;
  }

  .page-number {
    bottom: 2%;
  }

  .tag {
    cursor: pointer;
  }
}

h1 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin: 2.5%;
}

.label-btn {
  transition: 100ms;
  border-radius: 3px;
  padding: 6px;
}

.label-btn:hover {
  background-color: lightgray;
}
</style>
