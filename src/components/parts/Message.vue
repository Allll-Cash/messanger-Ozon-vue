<template>
  <div class="message-area">
    <div class="name-struct">
      <span :class="`${sender_id === user_id ? 'my-name' : 'not-my-name'}`"
            :style="`color: ${sender_id === user_id ? '#e5365a' : '#265bf5'};}`">{{ this.sender }}</span>
    </div>
    <div class="message-struct">
      <div class="message-components" v-if="sender && sender_id === user_id"></div>
      <div :class="`message ${sender_id === user_id ? 'my' : sender_id ? 'not-my' : 'service'}`">
        <span>{{ this.text }}</span> <br>
        <small style="text-align: right">{{ this.time }}</small>
      </div>
      <div class="message-components" v-if="sender && sender_id !== user_id"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ['user', 'message', 'sender_id', 'user_id', 'text', 'time', 'sender'],
  methods: {},
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

.message {
  text-align: left;
  width: 70%;
  border-radius: 0.5rem;
  padding: 5px;
}

.message-struct, .name-struct {
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

.message-components {
  width: 30%;
}

.my-name {
  margin-left: auto;
}

</style>
