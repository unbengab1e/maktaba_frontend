export type Chapter = {
  chapter: number;
  chapterDetail: string;
  content: string;
  pageNum: {
    pre: number;
    cur: number;
    nxt: number;
  };
  pages: HTMLElement[];
  words: number[];
};

export type Tag = {
  id: number;
  chapter: number;
  offset: number;
  length: number;
  content: string;
  color: number;
  fill: boolean;
  private: boolean;
  dom: HTMLSpanElement;
  rect: DOMRect;
};

export type Setting = {
  backgroundColor: string;
  flipByChapter: boolean;
  fontSize: number;
  showPrivate: boolean;
  showPublic: boolean;
  textColor: string;
};

export type Comment = {
  bid: number;
  chapter: string;
  content: string;
  pid: number;
  username: string;
};

export const findPageByOffset = (chapter: Chapter, offset: number) => {
  let target = 0,
    sum = 0;
  for (
    let index = chapter.pageNum.pre;
    index < chapter.pageNum.pre + chapter.pageNum.cur;
    index++
  ) {
    sum += chapter.words[index];
    if (sum >= offset) {
      target = index;
      break;
    }
  }
  return target;
};

// /**
//  * 解析纯文本文件。纯文本中缺乏标题信息，使用正则匹配自动生成。
//  *
//  * @param text 原文
//  * @returns Chapter 对象
//  */
// export function parseTxt(text: String): Chapter {
//   // Regex to match chapters, e.g., "Chapter 1: Introduction"
//   const chapterRegex = /Chapter (\d+):? (.*)/g;
//   let match;
//   const chapters: Chapter[] = [];
//   let currentChapter: Chapter | null = null;
//   let page = 1; // Simulated page number

//   // Split text into lines for easier processing
//   const lines = text.split("\n");

//   lines.forEach((line, index) => {
//     match = chapterRegex.exec(line);
//     if (match) {
//       if (currentChapter) {
//         chapters.push(currentChapter);
//       }

//       const chapterNumber = match[1];
//       const chapterTitle = match[2] || `Chapter ${chapterNumber}`;
//       currentChapter = {
//         title: chapterTitle,
//         page: page++,
//         children: [],
//       };
//     } else if (currentChapter) {
//       // Add line to the current chapter's children
//       (currentChapter.children as String[]).push(line);
//     }

//     // Reset regex lastIndex to allow multiple matches in loop
//     chapterRegex.lastIndex = 0;
//   });

//   // Push the last chapter if exists
//   if (currentChapter) {
//     chapters.push(currentChapter);
//   }

//   // Generate a root chapter to hold all chapters
//   const rootChapter: Chapter = {
//     title: "Document Root",
//     page: 0,
//     children: chapters,
//   };

//   return rootChapter;
// }

// // Example usage
// const text = `
// Chapter 1: Introduction
// This is the first chapter.

// Chapter 2: Background
// This is the second chapter.

// Some text without a chapter.

// Chapter 3: Conclusion
// This is the final chapter.
// `;

// const parsed = parseTxt(text);
// console.log(JSON.stringify(parsed, null, 2));
