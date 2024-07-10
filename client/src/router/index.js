import Vue from 'vue'
import VueRouter from 'vue-router'
import Game3x3 from '../views/Game3x3.vue'
import Faqs from '../views/Faqs.vue';
import ContactUs from '../views/ContactUS.vue';
import Myaccount from '../views/user/Myaccount.vue';
import Avatar from '../views/user/Avatar.vue';
import Admin from '../components/admin/Dashboard.vue';
import Login from '../components/admin/login.vue';
import SignUp from '../components/admin/SignUp.vue';
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // return savedPosition if available
      return savedPosition
    } else {
      // return to top of page
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/game/:opp_turn?/:socket_id?/:id?/:dbid?',
      name: 'game',
      component: Game3x3
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/room-full',
      name: 'roomFull',
      component: () => import('../views/RoomFull.vue')
    },
    {
      name:'Faqs',
      path:'/faqs',
      component:Faqs
    },
    {
      name:'ContactUs',
      path:'/contact-us',
      component:ContactUs
    },
    {
      name:'Myaccount',
      path:'/my-account',
      component:Myaccount
    },
    {
      name:'Avatar',
      path:'/change-avatar',
      component:Avatar
    },
    {
      name:'Admin',
      path:'/admin',
      component:Admin
    },
    {
      name:'Login',
      path:'/login',
      component:Login
    },
    {
      name:'SignUp',
      path:'/sign-up',
      component:SignUp
    }
  ]
})

export default router
