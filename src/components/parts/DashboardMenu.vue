<template>
  <div class="menu-area">
    <div class="messages-area" v-if="!this.loading">
      <dialog-creator/>
      <dialog-presenter v-for="dialog in dialogs" :key="dialog.id" :dialog="dialog" :user="user" :name="dialog.meta.name"
                        :text="textFunc(dialog)" :time="timeFunc(dialog)"/>
    </div>
    <div class="messages-area" v-else>
      <dialog-creator/>
      <br>
      <span class="text-muted">Нет диалогов</span>
    </div>
    <img :src="images.logo" height="200" style="text-align: center" alt="">
  </div>
</template>

<script>
import DialogPresenter from './DialogPresenter.vue'
import axios from "axios";
import DialogCreator from "./DialogCreator.vue";

export default {
  name: "DashboardMenu",
  props: ['dialogs', 'user', 'users', 'loading'],
  components: {DialogCreator, DialogPresenter},
  methods: {
    update() {
      axios
        .post(this.url('/v1/dialogs'),
          {
            user_id: this.user.id,
            limit: 100
          }
        )
        .then((response) => {
          // console.log(response)
          // this.data = response.data.bookings
          this.dialogs = response.data.dialogs
          this.users = response.data.users
          console.log(this.users)
          this.loading = false
        })
      setTimeout(() => this.update(), 1000)
    },
    load: function () {
      this.update()
      // axios
      //   .post(this.url('/v1/dialogs'),
      //     {
      //       user_id: this.user.id,
      //       limit: 100
      //     }
      //   )
      //   .then((response) => {
      //     // this.dialogs = [{
      //     //   id: 0,
      //     //   meta: {name: 'Nadia'},
      //     //   last_message: {
      //     //     content : {
      //     //       text_content : {
      //     //         text: 'Hello',
      //     //       }
      //     //     },
      //     //     timestamp: '18:00'
      //     //   }
      //     // }, {
      //     //   id: 1,
      //     //   meta: {name: 'Dmitry'},
      //     //   last_message: {
      //     //     content : {
      //     //       text_content : {
      //     //         text: 'Длинное сообщение чтобы проверить как оно сокращается и сокращается ли',
      //     //       }
      //     //     },
      //     //     timestamp: '19:00'
      //     //   }
      //     // }]
      //     // console.log(response)
      //     // this.data = response.data.bookings
      //     this.dialogs = response.data.dialogs
      //     this.loading = false
      //   })
    },
    textFunc(dialog) {
      let text = this.senderFunc(dialog)
      // console.log(this.dialog)
      // console.log(this.user)
      // console.log('1111', text)
      if (dialog.lastMessage.content.textContent) {
        text = text + dialog.lastMessage.content.textContent.text
      }
      if (dialog.lastMessage.content.serviceContent) {
        text = text + dialog.lastMessage.content.serviceContent.text
      }
      // console.log('2222', text)
      text = text.length < 30 ?
        text :
        (text.slice(0, 27) + '...')
      return text
    },
    timeFunc(dialog) {
      const date = new Date(dialog.lastMessage.timestamp / 1000000);
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = date.getUTCMonth() + 1;
      const realMonth = month < 10 ? '0' + month : month
      return hours + ':' + minutes + ', ' + day + '/' + realMonth;
    },
    senderFunc(dialog) {
      // console.log('xxxxx', this.users)
      // console.log('sender', this.dialog.lastMessage.senderId)
      if (this.is_empty(dialog.lastMessage.senderId)) {
        return ''
      }
      // console.log('sender not empty')
      // console.log('msg', msg.senderId)
      for (const user of this.users) {
        // console.log('user', user.id)
        if (user.id === dialog.lastMessage.senderId) {
          // console.log(user)
          return user.meta.name + ': '
        }
      }
    },
  },
  mounted() {
    this.loading = true
    this.load()
  }
}
</script>

<style scoped>
.menu-area {
  position: fixed;
  top: 30px;
  bottom: 0;
  left: 0;
  width: 400px;
  background-color: white;
}

.messages-area {
  position: absolute;
  top: 0;
  width: 400px;
  left: 0;
  bottom: 200px;
  overflow-y: auto;
}


img {
  position: fixed;
  bottom: 0;
  left: 215px;
  width: 180px;
}
</style>
