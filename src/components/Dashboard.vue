<template>
  <div class="dashboard-area" :style="`height: ${window_height - 30}px`">
    <div class="center-content" v-if="!current_dialog">
      <span>Выберите диалог</span>
    </div>

    <div v-if="current_dialog">
      <div class="messages-area">
        <div v-for="msg in messages" style="text-align: left">
          <span :style="`color: ${msg.senderId === user.id ? '#e5365a' : '#265bf5'};}`">{{ msg.senderId }}</span>
          <br>
          <div :class="`message ${msg.senderId === user.id ? 'my' : msg.senderId ? 'not-my' : 'service'}`">
            <span>{{ text(msg) }}</span> <br>
            <small style="text-align: right">{{ time(msg.timestamp) }}</small>
          </div>
        </div>
      </div>

      <div style="position: absolute; bottom: 5px; right: 0; left: 0;">
        <div style="margin: 10px;" class="row">
          <div class="col">
            <textarea class="form-control" rows="2" style="height: 100%" v-model="message"/>
          </div>
          <div class="col-2">
            <button class="btn btn-sm btn-primary shadow-none" style="height: 100%" @click="send_message()">Отправить
            </button>
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
  components: {Loading},
  data() {
    return {
      current_dialog: undefined,
      messages: [],
      message: ''
    }
  },
  computed: {},
  methods: {
    update() {
      axios
        .post(this.url('/v1/messages'),
          {
            user_id: this.user.id,
            dialog_id: this.current_dialog.id,
            limit: 100
          }
        )
        .then((response) => {
          // console.log(response)
          // console.log(response.data.messages)
          // console.log(this.current_dialog)
          this.messages = response.data.messages.reverse()
          console.log("update")
          setTimeout(() => {this.update()}, 1000)
        })
    },
    load: function () {
      // выгрузить сообщения
      // this.messages = [{
      //   senderId: this.current_dialog.id === 0 ? 'Nadia' : 'b@ozon.ru',
      //   content: {textContent: {text: this.current_dialog.id === 0 ? 'Hello' : 'Длинное сообщение чтобы проверить как оно сокращается и сокращается ли'}},
      //   timestamp: this.current_dialog.id === 0 ? '18:00' : '19:00'
      // }]
      this.update()
    },
    send_message: function () {
      // let date = new Date()
      // отправлять на сервер сообщение (message)
      // this.messages.push({
      //   senderId: this.user.id,
      //   content: {textContent: {text: this.message}},
      //   timestamp: `${(date.getHours() < 10 ? ('0') : '') + date.getHours()}:${(date.getMinutes() < 10 ? ('0') : '') + date.getMinutes()}`
      // })
      // this.message = ''
      console.log(this.message)
      axios
        .post(this.url('/v1/message'),
          {
            sender_id: this.user.id,
            dialog_id: this.current_dialog.id,
            content: {textContent: {text: this.message}}
          }
        )
        .then((response) => {
          console.log(response)
          // this.messages = response.data.messages
          console.log("send")
          this.messages.push(response.data.message)
          this.message = ''
        })
    },
    text(msg) {
      // console.log(msg)
      // console.log("XXXXXXXX")
      if (msg.content.textContent) {
        return msg.content.textContent.text
      }
      if (msg.content.serviceContent) {
        return msg.content.serviceContent.text
      }
    },
    time(timestamp) {
      const date = new Date(timestamp / 1000000);
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = date.getUTCMonth() + 1;
      const realMonth = month < 10 ? '0' + month : month
      return hours + ':' + minutes + ', ' + day + '/' + realMonth;
    }
  },
  created() {
    Event.listen('open-dialog', (dialogAndUser) => {
      console.log(dialogAndUser)
      console.log(dialogAndUser.dialog)
      console.log(dialogAndUser.user)
      this.current_dialog = dialogAndUser.dialog
      this.user = dialogAndUser.user
      this.load()
      // while (true) {
      //   setTimeout(() => {
      //     axios
      //       .post(this.url('/v1/messages'),
      //         {
      //           user_id: this.user.id,
      //           dialog_id: this.current_dialog.id,
      //           limit: 100
      //         }
      //       )
      //       .then((response) => {
      //         console.log('update')
      //         this.messages = response.data.messages
      //       })
      //   }, 5000)
      // }
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
  overflow-y: scroll;
}

.form-control {
  height: 34px;
}

.btn-primary {
  margin: 0;
}

.message {
  text-align: left;
  min-width: 30%;
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

.service {
  background-color: lightgray;
  text-align: center;
}

</style>

<!--
<template>
  <div class="dashboard-area" :style="`height: ${window_height - 30}px`">
    <div class="center-content" v-if="!current_dialog">
      <span>Выберите диалог</span>
    </div>

    <div v-if="current_dialog">
      <div class="messages-area">
        <div v-for="msg in messages.reverse()" style="text-align: left">
          <span :style="`color: ${msg.senderId === user.id ? '#e5365a' : '#265bf5'};`">{{ msg.senderId }}</span> <br>
          <div :class="`message ${msg.senderId === user.id ? 'my' : 'not-my'}`">
            <span>{{ text(msg) }}</span> <br>
            <small style="text-align: right">{{msg.timestamp}}</small>
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
  props: ['user', 'current-dialog'],
  components: { Loading},
  // data() {
  //   return {
  //     current_dialog: undefined,
  //     messages: [],
  //     message: ''
  //   }
  // },
  computed: {},
  methods: {
    load: function () {
      axios
        .post(this.url('/v1/messages'),
          {
            user_id: this.user.id,
            dialog_id: this.current_dialog.id,
            limit: 100
          }
        )
        .then((response) => {
          console.log(response)
          console.log(response.data.messages)
          console.log(this.current_dialog)
          this.messages = response.data.messages
        })
      // выгрузить сообщения
      // if (this.current_dialog.id === 0) {
      //   this.messages = [{
      //     sender : 'Nadia',
      //     content : {
      //       text_content : {
      //         text: 'Hello',
      //       }
      //     },
      //     timestamp: '18:00'
      //   }]
      // } else {
      //   this.messages = [{
      //     sender : 'Dmitry',
      //     content : {
      //       text_content : {
      //         text: 'Длинное сообщение чтобы проверить как оно сокращается и сокращается ли',
      //       }
      //     },
      //     timestamp: '19:00'
      //   }]
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
    },
    text(msg) {
      console.log(msg)
      console.log("XXXXXXXX")
      if (msg.content.textContent) {
        return msg.content.textContent.text
      }
      if (msg.content.serviceContent) {
        return msg.content.serviceContent.text
      }
    }
  },
  created() {
    Event.listen('open-dialog', (dialogAndUser) => {
      console.log(dialogAndUser)
      console.log(dialogAndUser.dialog)
      console.log(dialogAndUser.user)
      this.current_dialog = dialogAndUser.dialog
      this.user = dialogAndUser.user
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
-->
