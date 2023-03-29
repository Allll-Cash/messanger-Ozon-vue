<template>
  <div class="header">
    <div style="margin-left: 10px; position: absolute; top: -2px;">
      <img :src="images.ozon_logo" height="35"  alt="">
    </div>
    <button class="btn btn-sm btn-link text-right exit" @click="exit()">Выйти</button>
  </div>
</template>

<script>
export default {
  name: "DashboardHeader",
  methods: {
    exit: function () {
      this.$confirm({
        message: 'Вы уверены, что хотите выйти из мессенджера?',
        button: {
          no: 'Нет',
          yes: 'Да'
        },
        callback: confirm => {
          if (confirm) {
            Event.fire('exit')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  bottom: auto;
  top: 0;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid #265bf5;
  color: white;
  background-color: #265bf5;
  text-align: left;
  padding-left: 10px;
}

.exit {
  margin-top: 0;
  position: absolute;
  right: 15px;
}

.material-symbols-outlined {
  font-size: 20px;
  top: 4px;
  position: relative;
}
</style>
