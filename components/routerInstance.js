'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './HomePage'
import MainSection from './mainSection'
import SectionInfo from './SectionInfo'
import SectionDetails from './SectionDetails'
import currentPost from './currentPost'

Vue.use ( VueRouter )

const router = new VueRouter ({
  props: ["id"],
  model: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      props: true,
      meta: {
          title: 'Vue courseware',
          metaTags: [
            {
                name: 'description',
                content: 'Vue.js courseware | samples and explanations'
            },
            {
                property: 'og:description',
                content: 'Vue.js courseware | samples and explanations'
            }
          ]
      }
    },
    {
      path: '/:id',
      name: 'mainSection',
      component: MainSection,
      meta: {
          title: "Vue courseware",
          metaTags: [
            {
                name: 'description',
                content: 'Vue.js courseware | samples and explanations'
            },
            {
                property: 'og:description',
                content: 'Vue.js courseware | samples and explanations'
            }
          ]
      },
      props: true,
      children: [
        {
          path: 'about',
          component: SectionInfo,
          name:'about'
        },
        {
          path: 'details',
          component: SectionDetails,
          name:'details',
          children: [
            {
              path: 'section/:post',
              component: currentPost,
              name:'section',
              props: true,
              params: route => {
                  return { postId: route.params.post }
              }
            }
          ]
        }
      ]
    }
  ]
})
export default router
