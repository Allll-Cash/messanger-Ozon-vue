<template>
  <div class="message-area">
    <div class="name-struct">
      <span :class="`${sender_id === user_id ? 'my-name' : 'not-my-name'}`"
            :style="`color: ${sender_id === user_id ? '#e5365a' : '#265bf5'};}`">{{ this.sender }}</span>
    </div>
    <div class="message-struct">
      <div class="message-components-my" v-if="sender && sender_id === user_id"></div>
      <button class="message-upd" v-if="sender && sender_id === user_id" @click="upd()">
        <img src="static/pencil.svg">
      </button>
      <div :class="`message ${sender_id === user_id ? 'my' : sender_id ? 'not-my' : 'service'}`">
        <span v-if="state === 'message'">{{ this.text }}<br></span>
        <div v-if="state === 'upd'" class="message-update">
          <textarea class="form-control" rows="1" v-model="text"/>
          <button class="btn btn-sm btn-primary shadow-none upd-button" @click="upd_message()">Редактировать
          </button>
        </div>
        <small style="text-align: right">{{ this.time }}</small>
      </div>
      <div class="message-components-not-my" v-if="sender && sender_id !== user_id"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Message",
  props: ['user', 'message', 'sender_id', 'user_id', 'text', 'time', 'sender'],
  data() {
    return {
      state: 'message',
      last_msg: ''
    }
  },
  methods: {
    upd() {
      if (this.state === 'message') {
        this.last_msg = this.text
        this.state = 'upd'
      }
      else {
        this.text = this.last_msg
        this.state = 'message'
      }
    },
    upd_message() {
      axios
        .patch(this.url('/v1/message'),
          {
            user_id: this.user_id,
            message_id: this.message.id,
            content: {textContent: {text: this.text}}
          }
        )
        .then((response) => {
          // console.log(response)
          // this.messages = response.data.messages
          console.log("update message")
          // this.messages.push(response.data.message)
          // this.message = ''
          this.state = 'message'
        })
    }
  },
  mounted() {
    // console.log('text', this.text)
    // console.log('time', this.time)
    // console.log('sender', this.sender)
    // console.log('user_id', this.user_id)
    // console.log('user_id', this.user_id)
  }
}
</script>

<style>
/*.message-area {*/
/*  background-color: magenta;*/
/*}*/

/*.message-struct {*/
/*  background-color: darkmagenta;*/
/*}*/

/*.my-name, .not-my-name {*/
/*  background-color: #66cfe7;*/
/*}*/

/*.message-update {*/
/*  background-color: #f0f3f6;*/
/*  width: 100%;*/
/*}*/

.message {
  text-align: left;
  width: 70%;
  border-radius: 0.5rem;
  padding: 5px;
}

.message-struct, .name-struct, .message-update {
  display: flex;
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
  margin: auto;
  width: 40%;
}

.message-components-not-my {
  width: 30%;
}

.message-components-my {
  width: calc(30% - 50px);
}

.my-name {
  margin-left: auto;
}

.message-upd {
  width: 50px;
  height: 50px;
  /*border: none;*/
  background-color: inherit;
  margin: auto 5px auto 0;
  border-radius: 25px;
  transition: transform .2s ease-in-out;
}

.message-upd:hover {
  transform: rotate(30deg);
}

.form-control {
  width: 100%;
}

.upd-button {
  min-width: 120px;
  margin-left: 5px;
}

.message-update {
  width: 100%;
}

</style>
