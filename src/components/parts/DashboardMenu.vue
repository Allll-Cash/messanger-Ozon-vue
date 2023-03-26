<template>
  <div class="menu-area">
    <div v-if="!dialogs.length">
      <span class="text-muted">Нет диалогов</span>
    </div>
    <div class="messages-area" v-else>
      <dialog-presenter v-for="dialog in dialogs" :key="dialog.id" :dialog="dialog"/>
    </div>
    <img :src="images.logo" height="200" style="text-align: center" alt="">
  </div>
</template>

<script>
import DialogPresenter from './DialogPresenter.vue'

export default {
  name: "DashboardMenu",
  components: {DialogPresenter},
  data() {
    return {
      dialogs: []
    }
  },
  methods: {
    load: function () {
      // тут загружать список диалогов
      /*
            axios
              .get(this.url('/booking/by-date'), {params: {}})
              .then((response) => {
                this.data = response.data.bookings
              })

       */
      this.dialogs = [{
        id: 0,
        name: 'Nadia',
        last_message: {
          text: 'Hello',
          time: '18:00'
        }
      }, {
        id: 1,
        name: 'Dmitry',
        last_message: {
          text: 'Длинное сообщение чтобы проверить как оно сокращается и сокращается ли',
          time: '19:00'
        }
      }]
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
