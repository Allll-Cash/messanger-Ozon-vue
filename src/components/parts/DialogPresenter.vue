<template>
  <div class="card text-left">

    <div class="card-header">
      <h6 class="card-title">{{dialog.name}}</h6>
    </div>

    <div class="card-body">
      <div class="card-text">
        <span class="text-muted"><i>{{dialog.last_message}}</i></span>
      </div>
    </div>

    <div class="card-footer">
      <slot></slot>
    </div>

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
  data() {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped>
.card {
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position: right 5px bottom 5px;
  background-size: 55px;
  height: 100%;
}

.card a {
  font-size: 0.75rem;
}

.card-body {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: start;
  padding: 10px;
}

.card-text {
  font-size: 13px;
  text-align: left;
}
.row {
  column-gap: 0;
}

.card-header {
  text-align: left;
  background-color: white;
  border-bottom: none;
  height: 30px;
  padding: 10px 0 0 10px;
}

.card-footer {
  text-align: left;
  background-color: white;
  border-top: none;
  padding: 0 0 5px 10px;
}
</style>
