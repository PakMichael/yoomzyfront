import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  proccessRequestError,
  headers
} from './helpers/REST'
import VueCookies from 'vue-cookies'
import VueTippy, {
  TippyComponent
} from "vue-tippy";


Vue.prototype.$publicPath = process.env.BASE_URL
Vue.prototype.$axios = axios
Vue.prototype.$proccessRequestError = (err) => {
  proccessRequestError(store, err)
}
Vue.prototype.$headers = headers

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);
Vue.use(VueCookies)
async function isTokenValid() {
  if (!localStorage.getItem('token')) {
    throw new Error('Token doesn\'t exist!');
  }
  let headers = {
    ...headers,
    Authorization: `Token ${store.state.token}`
  }
  let config = {
    headers
  };
  let isValid = await axios.get(
    `//${process.env.VUE_APP_ENDPOINT_HOST}/api/auth/validate`,
    config
  );

  return isValid;
}



router.beforeEach((to, from, next) => {


  if (to.matched.some(route => route.meta.requiresAuth)) {
    return isTokenValid().then((value) => {
      if (to.meta.employerOnly) {
        if (value.data.is_employer) {
          return next();
        } else {
          next({
            name: 'Home'
          })
        }
      } else {
        return next();
      }
    }).catch((error) => {
      proccessRequestError(error)
      localStorage.removeItem('token');
      store.commit("set", ["nextPage", to.name]);
      return next({
        name: 'Authorization'
      });
    })

  }
  if (to.matched.some(route => route.meta.guestOnly)) {
    return isTokenValid().then((value) => {
      return next({
        name: 'Home'
      })
    }).catch((error) => {
      localStorage.removeItem('token');
      return next();
    })
  }
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})