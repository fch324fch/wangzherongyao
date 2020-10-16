import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

import MingwenEdit from '../views/MingwenEdit.vue'
import MingwenList from '../views/MingwenList.vue'

import UserskillEdit from '../views/UserskillEdit.vue'
import UserskillList from '../views/UserskillList.vue'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [   //登录页面
    { path: '/login', name: 'login', component: login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit },
        //props:true把edit所有的url参数注入CategoryEdit页面使得CategoryEdit可以直接使用url参数
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },

        { path: '/items/create', component: ItemEdit },
        //props:true把edit所有的url参数注入ItemEdit页面使得ItemEdit可以直接使用url参数
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/items/list', component: ItemList },

        { path: '/heroes/create', component: HeroEdit },
        //props:true把edit所有的url参数注入HeroEdit页面使得HeroEdit可以直接使用url参数
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },
        { path: '/heroes/list', component: HeroList },

        { path: '/articles/create', component: ArticleEdit },
        //props:true把edit所有的url参数注入ArticleEdit页面使得ArticleEdit可以直接使用url参数
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

        { path: '/ads/create', component: AdsEdit },
        //props:true把edit所有的url参数注入AdsEdit页面使得AdsEdit可以直接使用url参数
        { path: '/ads/edit/:id', component: AdsEdit, props: true },
        { path: '/ads/list', component: AdsList },

        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },

        { path: '/mingwen/create', component: MingwenEdit },
        { path: '/mingwen/edit/:id', component: MingwenEdit, props: true },
        { path: '/mingwen/list', component: MingwenList },

        { path: '/user_skill/create', component: UserskillEdit },
        { path: '/user_skill/edit/:id', component: UserskillEdit, props: true },
        { path: '/user_skill/list', component: UserskillList },
      ]

    }
  ]
})

//导航守卫 第一个参数要去哪个页面 第二参数来自哪个页面 第三个参数要不要进入或者怎么处理
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()

})
export default router
