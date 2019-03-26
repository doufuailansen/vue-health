import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/App'
import Index from '@/components/Index'
import Consult from  '@/components/Consult'
import Garden from  '@/components/Garden'
import Article from '@/components/Article'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Question from '@/components/Question'
import DocRegister from '@/components/DocRegister'
import UserCenter from '@/components/UserCenter'
import MyInfo from '@/components/MyInfo'
import MyQuestion from '@/components/MyQuestion'
import UserProcess from '@/components/UserProcess'
import DocProcess from '@/components/DocProcess'
import Rules from '@/components/Rules'
import $ from 'jquery'


Vue.use(Router);
Vue.use($);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
      {
          path: '/index',
          name: 'Index',
          component: Index,
          children: [
              {
                  path: 'login',
                  name:'Login',
                  component: Login
              },
              {
                path: 'register',
                  name: 'Register',
                  component: Register
              },
              {
                  path: 'docreg',
                  name: 'DocRegister',
                  component: DocRegister
              },
            {
              path: 'userprocess',
              name: 'UserProcess',
              component: UserProcess
            },
            {
              path: 'docprocess',
              name: 'DocProcess',
              component: DocProcess
            },
            {
              path: 'rules',
              name: 'Rules',
              component: Rules
            }
          ]
      },
    {
      path: '/consult',
      name: 'Consult',
      component: Consult,
        // children: [
        //     {
        //         path: 'question',
        //         name:'Question',
        //         component: Question
        //     },
        // ]
    },
      {
          path: '/garden',
          name: 'Garden',
          component: Garden
      },
      {
          path: '/article',
          name: 'Article',
          component: Article
      },
      {
          path: '/question',
          name: 'Question',
          component: Question
      },
      {
          path: '/usercenter',
          name: 'UserCenter',
          component: UserCenter,
          children: [
              {
                  path: 'myinfo',
                  name:'MyInfo',
                  component: MyInfo
              },{
                  path: 'myquestion',
                  name: 'MyQuestion',
                  component: MyQuestion
              }
          ]
      }
  ]
})
