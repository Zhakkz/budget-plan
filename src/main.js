import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filter/date.filter'
import messagePlugin from '@/utils/message.plugin'
import currencyFilter from '@/filter/currency.filter'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'



Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyCcA6xw6PnD_OJ4M-9OzlehtagfO9iYGfI",
  authDomain: "budget-plan-bad9b.firebaseapp.com",
  databaseURL: "https://budget-plan-bad9b.firebaseio.com",
  projectId: "budget-plan-bad9b",
  storageBucket: "",
  messagingSenderId: "816557725935",
  appId: "1:816557725935:web:80d49c9b2258b32e"
};
firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(() => {
  if(!app){
      app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


