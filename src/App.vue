<template>
  <div id="app">
    <vue-confirm-dialog/>
<log-in v-if="state === 'login'"/>
    <div v-if="state === 'dashboard'">
      <dashboard-header/>
      <dashboard-menu :user="user"/>
      <dashboard :user="user"/>
    </div>
  </div>
</template>

<script>
import DashboardHeader from "./components/parts/DashboardHeader.vue";
import LogIn from "./components/LogIn.vue";
import Dashboard from "./components/Dashboard.vue";
import DashboardMenu from "./components/parts/DashboardMenu.vue";

export default {
  name: 'App',
  props: ['user'],
  components: {
    Dashboard,
    LogIn,
    DashboardHeader,
    DashboardMenu
  },
  data() {
    return {
      state: 'login',
      // user: {
      //   name: 'Lisa'
      // }
    }
  },
  methods: {},
  created() {
    Event.listen('authorised', (user) => {
      this.user = user
      console.log(user)
      this.state = 'dashboard'
    })
    Event.listen('exit', () => {
      this.state = 'login'
      this.user = undefined
    })
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.03em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f0f3f6;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.btn-sm {
  font-size: 12px;
  font-weight: 600;
}

.btn {
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 0.3rem;
  letter-spacing: 0.05em;
}

.btn-primary {
  background-color: #265bf5;
  border-color: #265bf5;
}

.btn-primary:hover, .btn-primary:active {
  background-color: #48a1f8 !important;
  border-color: #48a1f8 !important;
}

.btn-secondary {
  background-color: #48a1f8;
  border-color: #48a1f8;
  color: white;
}

.btn-secondary:hover, .btn-secondary:active {
  background-color: #66cfe7 !important;
  border-color: #66cfe7 !important;
  color: white!important;
}

.btn-danger {
  background-color: #e5365a;
  border-color: #e5365a;
  color: white;
}


.btn-danger:hover, .btn-danger:active {
  background-color: #ff466c !important;
  border-color: #ff466c !important;
  color: white !important;
}

.content-container {
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.error {
  color: #ba1a1a;
}

.btn-link {
  color: white;
}

.form-shadow {
  box-shadow: 0 0 2px rgb(0 0 0 / 40%);
}

.form-select, .form-control {
  font-size: 14px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: #e5365a;
}

span {
  font-size: 14px;
}

small{
  font-size: 11px;
}

.modal {
  border-radius: 0.4rem;
}

.date-picker {
  width: 100%;
}


.margin {
  margin: 10px 0;
}

.container {
  padding: 15px;
}
</style>
