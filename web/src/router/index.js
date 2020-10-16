import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import HeroSkin from '../views/HeroSkin.vue'
import GongLue from '../views/GongLue.vue'
import Match from '../views/Match.vue'
import HeroShow from '../views/HeroShow.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/articles/:id', name: 'article', component: Article, props: true },//props：true表示所有在path里传递的参数都映射为Article的组件参数
      { path: '/gonglue', name: 'gonglue', component: GongLue },
      { path: '/match', name: 'match', component: Match },
    ]
  },
  {
    path: '/heroes/:id', name: 'heroes', component: Hero, props: true,
  },
  { path: '/heroskin/:id', name: 'heroskin', component: HeroSkin, props: true },

  { path: '/heroshow/:id', name: 'heroshow', component: HeroShow, props: true },

]

const router = new VueRouter({
  routes
})

export default router
