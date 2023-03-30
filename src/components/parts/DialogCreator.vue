<template>
  <div class="dialog">
    <button class="btn dialog-btn" @click="create_dialog()">
<!--      <h6>{{dialog.meta.name}}</h6>-->
<!--      <span>{{text}}</span> <br>-->
<!--      <small class="text-muted">{{time}}</small>-->
      Создать диалог
    </button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "DialogCreator",
  props: [],
  computed: {
  },
  data() {
    return {
    }
  },
  methods: {
    create_dialog() {
      Event.fire('create-dialog')
    }
  },
  mounted() {
    // this.update()
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
  text-align: center;
  border-bottom: #f0f3f6 1px solid;
  color: #265bf5;
  font-size: x-large;
}

.dialog-btn:hover, .dialog-btn:active {
  background-color: #f0f3f6 !important;
  border-color: #f0f3f6 !important;
}
</style>
