<template>
  <div class="menu-area">
    <div v-if="!dialogs.length">
      <span class="text-muted">Нет диалогов</span>
    </div>
    <div class="messages-area" v-else>
      <dialog-presenter v-for="dialog in dialogs" :key="dialog.id" :dialog="dialog" :user="user"/>
    </div>
    <img :src="images.logo" height="200" style="text-align: center" alt="">
  </div>
</template>

<script>
import DialogPresenter from './DialogPresenter.vue'
import axios from "axios";

export default {
  name: "DashboardMenu",
  props: ['dialogs', 'user'],
  components: {DialogPresenter},
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
          console.log(response)
          // this.data = response.data.bookings
          this.dialogs = response.data.dialogs
          // this.loading = false
          // setTimeout(() => this.update(), 1000)
        })
    },
    load: function () {
      axios
        .post(this.url('/v1/dialogs'),
          {
            user_id: this.user.id,
            limit: 100
          }
        )
        .then((response) => {
          // this.dialogs = [{
          //   id: 0,
          //   meta: {name: 'Nadia'},
          //   last_message: {
          //     content : {
          //       text_content : {
          //         text: 'Hello',
          //       }
          //     },
          //     timestamp: '18:00'
          //   }
          // }, {
          //   id: 1,
          //   meta: {name: 'Dmitry'},
          //   last_message: {
          //     content : {
          //       text_content : {
          //         text: 'Длинное сообщение чтобы проверить как оно сокращается и сокращается ли',
          //       }
          //     },
          //     timestamp: '19:00'
          //   }
          // }]
          console.log(response)
          // this.data = response.data.bookings
          this.dialogs = response.data.dialogs
          this.loading = false
        })
    }
  },
  mounted() {
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
