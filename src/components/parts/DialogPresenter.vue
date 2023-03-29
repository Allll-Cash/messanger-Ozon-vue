<template>
  <div class="dialog text-left">
    <button class="btn dialog-btn" @click="open_dialog()">
      <h6>{{dialog.meta.name}}</h6>
      <span>{{text}}</span> <br>
      <small class="text-muted">{{time}}</small>
    </button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "DialogPresenter",
  props: ['dialog', 'user', 'text', 'time'],
  computed: {
  },
  data() {
    return {
    }
  },
  methods: {
    open_dialog: function () {
      console.log(this.dialog)
      console.log(this.user)
      let dialogAndUser = {"dialog" : this.dialog, "user" : this.user}
      console.log(dialogAndUser)
      this.textFunc()
      this.timeFunc()
      Event.fire('open-dialog', dialogAndUser)
    },
    update() {
      // console.log(this.dialog)
      axios
        .get(this.url('/v1/dialog/' + this.dialog.id))
        .then((response) => {
          // console.log(response)
          // this.messages = response.data.messages
          console.log("update dialog")
          this.dialog = response.data.dialog
          this.textFunc()
          this.timeFunc()
        })
      setTimeout(() => this.update(), 1000)
    },
    textFunc() {
      let text = '';
      // console.log(this.dialog)
      // console.log(this.user)
      if (this.dialog.lastMessage.content.textContent) {
        text = this.dialog.lastMessage.content.textContent.text
      }
      if (this.dialog.lastMessage.content.serviceContent) {
        text = this.dialog.lastMessage.content.serviceContent.text
      }
      this.text = text.length < 30 ?
        text :
        (text.slice(0, 27) + '...')
    },
    timeFunc() {
      const date = new Date(this.dialog.lastMessage.timestamp / 1000000);
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = date.getUTCMonth() + 1;
      const realMonth = month < 10 ? '0' + month : month
      this.time = hours + ':' + minutes + ', ' + day + '/' + realMonth;
    }
  },
  mounted() {
    this.update()
  }
}
</script>

<style scoped>
.dialog {
  width: 400px;
  height: 80px;
}

.dialog-btn {
  border-radius: 0;
  background-color: white;
  border-color: white;
  width: 100%;
  height: 100%;
  text-align: left;
  border-bottom: #f0f3f6 1px solid;
}

.dialog-btn:hover, .dialog-btn:active {
  background-color: #f0f3f6 !important;
  border-color: #f0f3f6 !important;
}
</style>
