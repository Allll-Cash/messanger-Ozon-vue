<template>
  <div class="dialog">
    <button class="btn dialog-btn" @click="create_dialog()">
      Создать диалог
    </button>
  </div>
</template>


<script>
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
  width: 300px;
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
