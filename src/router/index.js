import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookshelfView from '../views/BookshelfView.vue'
import TopView from '../views/TopView.vue'
import LibraryView from "../views/LibraryView.vue";
import BrowsingHistoryView from "../views/BrowsingHistoryView.vue";
import CreatorView from "../views/CreatorView.vue";
import CreatorIndexView from "../views/CreatorIndexView.vue";
import CreatorPromotionView from "../views/CreatorPromotionView.vue";
import IndividualView from "../views/IndividualView.vue";
import IndividualIndexView from "../views/IndividualIndexView.vue";
import IndividualSecurityView from "../views/IndividualSecurityView.vue";
import IndividualLikeView from "../views/IndividualLikeView.vue";
import IndividualInformationView from "../views/IndividualInformationView.vue";
import IndividualFocusView from "../views/IndividualFocusView.vue";
import IndividualCommentView from "../views/IndividualCommentView.vue";
import CreatorInformationView from "../views/CreatorInformationView.vue";
import BookshelfIndexView from "../views/BookshelfIndexView.vue";
import BookshelfHistoryView from "../views/BookshelfHistoryView.vue";
import SearchView from "../views/SearchView.vue";
import BookReaderView from "../views/BookReaderView.vue";
import PosterView from "@/views/PosterView.vue";
import IndividualWorksView from "@/views/IndividualWorksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Top',
      component: TopView,
    },
    {
      path: '/Library',
      name: 'library',
      component: LibraryView,
    },
    {
      path: '/Bookshelf',
      name: 'shelf',
      component: BookshelfView,
      redirect:'/Bookshelf/BookshelfIndex',
      children:[
        {
          path: 'BookshelfIndex', // 注意：不需要再重复写 /Creator 前缀
          name: 'bookshelfIndex',
          component: BookshelfIndexView
        },
        {
          path: 'BookshelfHistory', // 注意：不需要再重复写 /Creator 前缀
          name: 'bookshelfHistory',
          component: BookshelfHistoryView
        },
      ]
    },
    {
      path: '/BrowsingHistory',
      name: 'browsingHistory',
      component: BrowsingHistoryView
    },
    {
      path: '/Creator',
      name: 'creator',
      component: CreatorView,
      redirect:'/Creator/CreatorIndex',
      children: [
        {
          path: 'CreatorIndex', // 注意：不需要再重复写 /Creator 前缀
          name: 'creatorIndex',
          component: CreatorIndexView
        },
        {
          path: 'CreatorPromotion', // 注意：不需要再重复写 /Creator 前缀
          name: 'creatorPromotion',
          component: CreatorPromotionView
        },
        {
          path: 'CreatorInformation', // 注意：不需要再重复写 /Creator 前缀
          name: 'creatorInformation',
          component: CreatorInformationView
        },
      ]
    },
    {
      path: '/Individual',
      name: 'individual',
      component: IndividualView,
      redirect:'/Individual/IndividualIndex',
      children: [
        {
          path: 'IndividualIndex', // 注意：不需要再重复写 /Creator 前缀
          name: 'individualIndex',
          component: IndividualIndexView,
          redirect:'/Individual/IndividualIndex/IndividualComment',
          children: [
            {
              path: 'IndividualLike',
              name: 'individualLike',
              component: IndividualLikeView
            },
            {
              path: 'IndividualWorks',
              name: 'individualWorks',
              component: IndividualWorksView
            },
            {
              path: 'IndividualComment',
              name: 'individualComment',
              component: IndividualCommentView
            },
          ]
        },
        {
          path: 'IndividualSecurity', // 注意：不需要再重复写 /Creator 前缀
          name: 'individualSecurity',
          component: IndividualSecurityView
        },
        {
          path: 'IndividualHistory', // 注意：不需要再重复写 /Creator 前缀
          name: 'individualHistory',
          component: BrowsingHistoryView
        },
        {
          path: 'IndividualInformation', // 注意：不需要再重复写 /Creator 前缀
          name: 'individualInformation',
          component: IndividualInformationView
        },
      ]
    },
    {
      path: '/Search',
      name: 'search',
      component: SearchView,
    },
    {
      path: "/reader",
      name: "reader",
      component: BookReaderView,
    },
  ]
})

export default router
