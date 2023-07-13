/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-12 20:45:02
 * @FilePath: \manage\src\router.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-12 10:23:04
 * @FilePath: \manage\src\router.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { gettoken } from './views/utils/tools'




const route = createRouter({
  routes: [{
    path: '/',
    redirect: '/Login'
  }, {
    path: '/Login',
    component: () => import('./views/Login/login.vue'),
    name: 'Login'
  }, {
    path: '/manger',
    meta: {
      needlogin:true,
    },
    component:()=>import('./components/layout.vue'),
    children: [{
      path: 'border',
      component: () => import('./views/border.vue'),
      name: 'border',
    }, {
      path: 'Goods',
      component: () => import('./views/Goods.vue'),
      name: 'Goods',
    }, {
      path: 'Goods_product',
      component: () => import('./views/Goods_product.vue'),
      name: 'product',
    }, {
      path: 'banner',
      component: () => import('./views/banner.vue'),
      name: 'banner',
    }, {
      path: 'banner_item',
      component: () => import('./views/banner_item.vue'),
      name: 'banneritem',
      }],
  }],
  history: createWebHashHistory()
})

route.beforeEach((to,from,next) => { 
  if (to.path.startsWith('/manger')) {
    if (gettoken) {
      next()
    } else { 
      next('/Login')
    }
  } else { 
    next()
  }
})
export default route
