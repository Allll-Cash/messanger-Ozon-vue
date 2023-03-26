<template>
  <div class="dashboard-area" :style="`height: ${window_height - 30}px`">
    <dialogs-manager :user="user" v-if="state === 'dialogs'"/>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from "./parts/Loading.vue";
import DialogsManager from "./views/DialogsManager.vue";


export default {
  name: "Dashboard",
  props: ['user'],
  components: {DialogsManager, Loading},
  data() {
    return {
      state: 'dialogs'
    }
  },
  computed: {},
  methods: {},
  created() {
    Event.listen('change-dashboard-state', (state) => this.state = state)
  }
}
</script>

<style scoped>
.dashboard-area {
  position: absolute;
  top: 30px;
  right: 0;
  left: 200px;
  padding: 10px;
  overflow-y: auto;
}

.form-control {
  height: 34px;
}

.btn-primary {
  margin: 0;
}
</style>
