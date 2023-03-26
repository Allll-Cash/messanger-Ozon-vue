<template>
  <div class="dashboard-area" :style="`height: ${window_height - 30}px`">
    <div class="center-content" v-if="!current_dialog">
      <span>Выберите диалог</span>
    </div>

    <div v-if="current_dialog">
      <div class="messages-area">
        <div v-for="msg in messages" style="text-align: left">
          <span :style="`color: ${msg.sender === user.name ? '#e5365a' : '#265bf5'};`">{{ msg.sender }}</span> <br>
          <div :class="`message ${msg.sender === user.name ? 'my' : 'not-my'}`">
            <span>{{ msg.text }}</span> <br>
            <small style="text-align: right">{{msg.time}}</small>
          </div>
        </div>
      </div>

      <div style="position: absolute; bottom: 5px; right: 0; left: 0;">
        <div style="margin: 10px;" class="row">
          <div class="col">
            <textarea class="form-control" rows="2" style="height: 100%" v-model="message"/>
          </div>
          <div class="col-2">
            <button class="btn btn-sm btn-primary shadow-none" style="height: 100%" @click="send_message()">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Loading from "./parts/Loading.vue";


export default {
  name: "Dashboard",
  props: ['user'],
  components: { Loading},
  data() {
    return {
      current_dialog: undefined,
      messages: [],
      message: ''
    }
  },
  computed: {},
  methods: {
    load: function () {
      // выгрузить сообщения
      this.messages = [{
        sender: this.current_dialog.id === 0 ? 'Nadia' : 'Dmitry',
        text: this.current_dialog.id === 0 ? 'Hello' : 'Длинное сообщение чтобы проверить как оно сокращается и сокращается ли',
        time: this.current_dialog.id === 0 ? '18:00' : '19:00'
      }]
    },
    send_message: function () {
      let date = new Date()
      // отправлять на сервер сообщение (message)
      this.messages.push({
        sender: this.user.name,
        text: this.message,
        time: `${(date.getHours() < 10 ? ('0') : '') + date.getHours()}:${(date.getMinutes() < 10 ? ('0') : '') + date.getMinutes()}`
      })
      this.message = ''
    }
  },
  created() {
    Event.listen('open-dialog', (dialog) => {
      this.current_dialog = dialog
      this.load()
    })
  }
}
</script>

<style scoped>
.dashboard-area {
  position: absolute;
  top: 30px;
  bottom: 0;
  right: 0;
  left: 400px;
  padding: 10px;
}

.messages-area {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 150px;
  padding: 10px;
  overflow-y: auto;
}

.form-control {
  height: 34px;
}

.btn-primary {
  margin: 0;
}

.message {
  text-align: left;
  min-width: 50%;
  max-width: 70%;
  border-radius: 0.5rem;
  padding: 5px;
}

.my {
  background-color: #e5365a;
  color: white;
}

.not-my {
  background-color: white;
}
</style>
