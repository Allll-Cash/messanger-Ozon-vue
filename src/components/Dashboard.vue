<template>
  <div class="dashboard-area" :style="`height: ${window_height - 30}px`">
    <div class="create-dialog-area" v-if="state === 'create-dialog'">
      <dialogs-creator-full :user="user"/>
    </div>
    <div class="update-dialog-area" v-else-if="state === 'update-dialog'">
      <dialogs-updater :user="user" :dialog="current_dialog"/>
    </div>
    <div v-else-if="!current_dialog">
      <span>Выберите диалог</span>
    </div>

    <div v-if="current_dialog && state==='dashboard'">
      <div class="dialog-info">
        <button class="dialog-info-btn" @click="update_dialog()">
          {{ current_dialog.meta.name }}
        </button>
      </div>

      <div class="messages-area">
        <div v-for="msg in messages">
          <message :user="user" :message="msg" :sender_id="msg.senderId" :user_id="user.id" :text="text(msg)"
                   :time="time(msg.timestamp)" :sender="sender(msg)"/>
        </div>
      </div>

      <div style="position: absolute; bottom: 0; right: 0; left: 0; background: #E7E7E7FF;">
        <div style="margin: 15px; display: flex; padding: 5px">
          <div style="margin: 0 10px; width: 100%;">
            <textarea class="form-control" rows="2" style="height: 100%; width: 100%;" v-model="message"/>
          </div>
          <div style="margin: 0 10px;">
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
import DialogsCreatorFull from "./parts/DialogCreatorFull.vue";
import DialogsUpdater from "./parts/DialogUpdater.vue";
import Message from "./parts/Message.vue";


export default {
  name: "Dashboard",
  components: {DialogsUpdater, DialogsCreatorFull, Message},
  props: ['user'],
  data() {
    return {
      current_dialog: undefined,
      messages: [],
      message: '',
      users: [],
      state: 'dashboard'
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
          this.users = response.data.users.reverse()
          // console.log(this.users)
          console.log("update")
        })
      // TODO setTimeout(() => {this.update()}, 1000)
    },
    load: function () {
      this.update()
    },
    send_message: function () {
      axios
        .post(this.url('/v1/message'),
          {
            sender_id: this.user.id,
            dialog_id: this.current_dialog.id,
            content: {textContent: {text: this.message}}
          }
        )
        .then((response) => {
          // console.log(response)
          // this.messages = response.data.messages
          console.log("send")
          this.messages.push(response.data.message)
          this.message = ''
        })
    },
    text(msg) {
      console.log(msg)
      // console.log("XXXXXXXX")
      if (msg.content.textContent) {
        return msg.content.textContent.text
      }
      if (msg.content.serviceContent) {
        return msg.content.serviceContent.text
      }
    },
    sender(msg) {
      if (this.is_empty(msg.senderId)) {
        return ''
      }
      // console.log('msg', msg.senderId)
      for (const user of this.users) {
        // console.log('user', user.id)
        if (user.id === msg.senderId) {
          // console.log(user)
          return user.meta.name + ' (' + user.id + ')'
        }
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
    },
    update_dialog: function () {
      this.state = 'update-dialog'
    }
  },
  created() {
    Event.listen('open-dialog', (dialogAndUser) => {
      // console.log(dialogAndUser)
      // console.log(dialogAndUser.dialog)
      // console.log(dialogAndUser.user)
      this.current_dialog = dialogAndUser.dialog
      this.user = dialogAndUser.user
      this.state = 'dashboard'
      this.load()
    })
    Event.listen('create-dialog', () => {
      this.state = 'create-dialog'
    })
    Event.listen('exit-dialog', () => {
      this.state = 'dashboard'
      this.current_dialog = null
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
  /*padding: 10px;*/
}

.messages-area {
  position: absolute;
  top: 70px;
  right: 0;
  left: 0;
  bottom: 90px;
  padding: 10px 10px 10px 10px;
  overflow-y: scroll;
}

.create-dialog-area {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 10px;
  overflow-y: scroll;
}

.update-dialog-area {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 10px;
  overflow-y: scroll;
}

.form-control {
  height: 34px;
}

.btn-primary {
  margin: 0;
}

.dialog-info {
  background: #e7e7e7;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
}

.dialog-info-btn {
  border-radius: 0;
  background-color: #e7e7e7;
  border-color: lightgray;
  width: 100%;
  height: 100%;
  text-align: center;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-top: 0;
  border-bottom: lightgray 2px solid;
  color: #265bf5;
  font-size: x-large;
}

.dialog-info-btn:hover, .dialog-info-btn:active {
  background-color: lightgray !important;
}

</style>
