<template>
  <div class="dialog text-left">
    <button class="btn dialog-btn" @click="open_dialog()">
      <h6>{{dialog.name}}</h6>
      <span>{{text}}</span> <br>
      <small class="text-muted">{{dialog.last_message.time}}</small>
    </button>
  </div>
</template>


<script>
export default {
  name: "DialogPresenter",
  props: {
    dialog: {
      required: true
    }
  },
  computed: {
    text() {
      return this.dialog.last_message.text.length < 30 ?
        this.dialog.last_message.text :
        (this.dialog.last_message.text.slice(0, 27) + '...')
    }
  },
  data() {
    return {
    }
  },
  methods: {
    open_dialog: function () {
      Event.fire('open-dialog', this.dialog)
    }
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
