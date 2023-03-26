<template>
  <div class="container">
    <h5>Диалог c {{dialog.name}}</h5>
    <div class="messages-area">
      <div class="message" v-for="msg in messages">
        <div :class="`message ${msg.sender === user.name ? 'my' : 'not-my'}`">
          <small>{{msg.sender}}</small> <br>
          <span>{{msg.text}}</span>
        </div>
      </div>
    </div>
    <div style="position: absolute; bottom: 5px; right: 0; left: 0;">
      <div style="margin: 10px;">
        <div style="text-align: left;">
          <span class="text-muted">{{ user.name }}</span>
        </div>
        <textarea class="form-control monitoring-input" rows="1" v-model="message"/>
        <small style="text-align: left">Введите сообщение</small>
      </div>
      <div style="text-align: right; margin-right: 10px;">
        <button class="btn btn-sm btn-primary shadow-none" @click="send_message()">Отправить сообщение</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogCard",
  props: {
    dialog: {
      required: true
    },
    user: {
      required: true
    }
  },
  components: {},
  data() {
    return {
      message: '',
      messages: [
        {
          //Вывести список сообщений с бэка и удаляем все кроме []
          sender: 'Nadia',
          text: 'Hello'
        }
      ],
      error: ''
    }
  },
  methods: {
    send_message: function () {
      // отправлять на сервер сообщение (message)
      this.messages.push({
        sender: this.user.name,
        text: this.message
      })
      this.message = ''
    }
  },
  created() {
    /*
    Сообщение с бэка, подгружать имя пользователя
    while (true) {
      setTimeout(() => {
      this.messages = // c сервера массив сообщений
        // обновлять сообщения
      }, 5000)
    }

     */
  }
}
</script>

<style scoped>
.messages-area {
  position: absolute;
  top: 30px;
  right: 0;
  left: 0;
  bottom: 150px;
  padding: 10px;
  overflow-y: auto;
}

.message {
  min-width: 50%;
  max-width: 70%;
  border-radius: 0.5rem;
  padding: 5px;
}

.message .my {
  text-align: left;
  background-color: #e5365a;
  color: white;
}

.message .not-my {
  text-align: left;
  background-color: #f0f3f6;
}
</style>
