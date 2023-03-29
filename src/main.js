// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios'

import VueConfirmDialog from 'vue-confirm-dialog'

import VModal from 'vue-js-modal/dist/index.nocss.js'

window.Event = new class {
  constructor() {
    this.vue = new Vue();
  }

  fire(event, data = null, silent = false) {
    if (!silent) {
      if (!data && data !== 0) {
        console.log('sending event', event);
      } else {
        console.log('sending event', event, 'with data', data);
      }
    }

    this.vue.$emit(event, data);
  }

  listen(event, callback) {
    this.vue.$on(event, callback);
  }
};

Vue.mixin({
  methods: {
    url: function (route) {
      return 'https://mywill.nostress.dev' + route
    },
    start_of_day: function (date) {
      date.setHours(0, 0, 0, 0)
      return date
    },
    format_time: function (hours, minutes) {
      return `${this.zero_pad(hours)}:${this.zero_pad(minutes)}`
    },
    format_date: function (day, month) {
      return `${this.zero_pad(day)}.${this.zero_pad(month)}`
    },
    zero_pad: function (number) {
      return `${number > 9 ? number : ('0' + number)}`
    },
    is_empty: function (str) {
      return !str || str === ''
    },
    toISOString: function (date) {
      return `${date.getFullYear()}-${this.zero_pad(date.getMonth() + 1)}-${date.getDate()}T${this.zero_pad(date.getHours())}:00:00.000Z`
    }
  },
  computed: {
    email_re() {
      return /^.+@ozon\.ru$/
    },
    window_height() {
      return window.innerHeight
    }
  },
  data() {
    return {
      images: {
        logo: '/static/ms-logo.png',
        ozon_logo: '/static/logo.png'
      },
    }
  }
})


Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.use(VModal, {componentName: 'Foo'})

new Vue({
  el: '#app',
  render: h => h(App)
})
