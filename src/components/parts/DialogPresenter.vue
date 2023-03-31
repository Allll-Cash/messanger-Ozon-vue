<template>
  <div class="dialog text-left">
    <button class="btn dialog-btn" @click="open_dialog()">
<!--      <h6>{{dialog.meta.name}}</h6>-->
<!--      <span>{{text}}</span> <br>-->
<!--      <small class="text-muted">{{time}}</small>-->
      <h6>{{name}}</h6>
      <span>{{text}}</span> <br>
      <small class="text-muted">{{time}}</small>
    </button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "DialogPresenter",
  props: ['dialog', 'user', 'name', 'text', 'time'],
  computed: {
  },
  data() {
    return {
    }
  },
  methods: {
    open_dialog: function () {
      let dialogAndUser = {"dialog" : this.dialog, "user" : this.user}
      Event.fire('open-dialog', dialogAndUser)
    },
  },
}
</script>

<style scoped>
.dialog {
  width: 300px;
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
