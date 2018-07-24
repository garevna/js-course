'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from 'JS/HomePage'
import MainSection from 'JS/mainSection'
import SectionInfo from 'JS/SectionInfo'
import SectionDetails from 'JS/SectionDetails'
import currentPost from 'JS/currentPost'

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
          title: 'JS courseware',
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
          title: "JS courseware",
          metaTags: [
            {
                name: 'description',
                content: 'JS courseware | Irina H. Fylyppova'
            },
            {
                property: 'og:description',
                content: 'JS courseware | Irina H. Fylyppova'
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
