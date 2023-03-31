<template>
  <div class="message-area">
    <div class="name-struct">
      <span :class="`${sender_id === user_id ? 'my-name' : 'not-my-name'}`"
            :style="`color: ${sender_id === user_id ? '#e5365a' : '#265bf5'};}`">{{ this.is_empty(this.sender) ? '\n' : this.sender }}</span>
    </div>
    <div class="message-struct">
      <div class="message-components-my" v-if="sender && sender_id === user_id"></div>
      <span class="likes" v-if="sender && sender_id === user_id">{{ likes }}</span>
      <button :class="`message-button ${is_like ? 'like' : ''}`" v-if="sender && sender_id === user_id" @click="like()">
        <img src="static/like.svg">
      </button>
      <span class="likes" v-if="sender && sender_id === user_id">{{ dislikes }}</span>
      <button :class="`message-button ${is_dislike ? 'dislike' : ''}`" v-if="sender && sender_id === user_id" @click="dislike()">
        <img src="static/dislike.svg">
      </button>
      <button class="message-button" v-if="sender && sender_id === user_id" @click="upd()">
        <img src="static/pencil.svg">
      </button>
      <div class="message-components-service" v-if="this.is_empty(sender)"></div>
      <div :class="`message ${sender_id === user_id ? 'my' : sender_id ? 'not-my' : 'service'}`">
        <span v-if="state === 'message'">{{ this.text }}<br></span>
        <div v-if="state === 'upd'" class="message-update">
          <textarea class="form-control" rows="1" v-model="text_new"/>
          <button class="btn btn-sm btn-primary shadow-none upd-button" @click="upd_message()">Редактировать
          </button>
        </div>
        <small style="text-align: right">{{ this.time }}</small>
      </div>
      <div class="message-components-service" v-if="this.is_empty(sender)"></div>
      <span class="likes" v-if="sender && sender_id !== user_id">{{ likes }}</span>
      <button :class="`message-button ${is_like ? 'like' : ''}`" v-if="sender && sender_id !== user_id" @click="like()">
        <img src="static/like.svg">
      </button>
      <span class="likes" v-if="sender && sender_id !== user_id">{{ dislikes }}</span>
      <button :class="`message-button ${is_dislike ? 'dislike' : ''}`" v-if="sender && sender_id !== user_id" @click="dislike()">
        <img src="static/dislike.svg">
        <div class="message-components-not-my" v-if="sender && sender_id !== user_id"></div>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Message",
  props: ['user', 'message', 'sender_id', 'user_id', 'text', 'time', 'sender', 'likes', 'dislikes', 'is_like', 'is_dislike'],
  data() {
    return {
      state: 'message',
      last_msg: '',
      text_new: '',
    }
  },
  methods: {
    upd() {
      if (this.state === 'message') {
        this.last_msg = this.text
        this.text_new = this.text
        this.state = 'upd'
      } else {
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
            content: {textContent: {text: this.text_new}}
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
    },
    like() {
      axios
        .post(this.url('/v1/reaction'),
          {
            user_id: this.user_id,
            message_id: this.message.id,
            like: true
          }
        )
        .then((response) => {
          // console.log(response)
          // this.messages = response.data.messages
          console.log("like message")
          // this.messages.push(response.data.message)
          // this.message = ''
          // this.state = 'message'
          // if (this.is_like) {
          //   this.is_like = false
          //   this.likes--
          // } else {
          //   this.is_like = true
          //   this.likes++
          // }
          // if (this.is_dislike) {
          //   this.is_dislike = false
          //   this.dislikes--
          // }
        })
    },
    dislike() {
      axios
        .post(this.url('/v1/reaction'),
          {
            user_id: this.user_id,
            message_id: this.message.id,
            like: false
          }
        )
        .then((response) => {
          // console.log(response)
          // this.messages = response.data.messages
          console.log("dislike message")
          // this.messages.push(response.data.message)
          // this.message = ''
          // this.state = 'message'
          // if (this.is_dislike) {
          //   this.is_dislike = false
          //   this.dislikes--
          // } else {
          //   this.is_dislike = true
          //   this.dislikes++
          // }
          // if (this.is_like) {
          //   this.is_like = false
          //   this.likes--
          // }
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
/*}*/

/*.likes {*/
/*  background-color: orange;*/
/*}*/

/*.message-button {*/
/*  background-color: yellow;*/
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
  margin-left: 5px;
}

.not-my {
  background-color: white;
  margin-right: 5px;
}

.service {
  background-color: lightgray;
  text-align: center;
  margin: auto;
  width: 40%;
}

.message-components-not-my {
  width: calc(30% - 105px);
}

.message-components-my {
  width: calc(30% - 175px);
}

.my-name {
  margin-left: auto;
}

.my-name, .not-my-name {
  min-height: 20px;
}

.message-button {
  width: 40px;
  height: 40px;
  min-width: 40px;
  /*border: none;*/
  background-color: inherit;
  margin: auto 5px auto 5px;
  border-radius: 20px;
  transition: transform .2s ease-in-out;
}

.message-button:hover {
  transform: rotate(30deg);
}

.like {
  background-color: lawngreen;
}

.dislike {
  background-color: red;
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

.likes {
  margin: auto 0;
  width: 10px;
}

.message-components-service {
  width: 30%;
}

</style>
