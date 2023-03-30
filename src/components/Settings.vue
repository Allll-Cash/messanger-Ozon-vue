<template>
  <div class="content-container" style="width: 350px;">
    <div class="card">
      <div class="text-center">
        <img :src="images.logo" class="card-img-top logo" alt="...">
      </div>
      <div class="card-body">
        <h5 class="card-text label-light">Обновление данных</h5>
        <input id="upper" type="text" class="form-control shadow-none" v-model="name" placeholder="Имя"
               value="this.user.meta.name"/>
        <input type="text" class="form-control shadow-none" v-model="surname" placeholder="Фамилия"
               value="this.user.meta.surname"/>
        <small class="card-text error">{{ error }}</small><br>
        <button class="btn btn-primary shadow-none" @click="upd()">Обновить</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Settings",
  props: ['user'],
  data() {
    return {
      name: '',
      surname: '',
      error: '\n'
    }
  },
  methods: {
    upd: function () {
      if (!this.is_empty(this.name)) {
        axios
          .patch(this.url('/v1/user'), {
            userId: this.user.id,
            meta: {'name': this.name, 'surname': this.surname}
          })
          .then((response) => {
            this.error = ''
            this.user = response.data.user
            console.log(this.user)
            if (!this.user) {
              this.error = 'Внутренняя ошибка'
            } else {
              Event.fire('authorised', this.user)
            }
          })
      } else {
        this.error = 'Имя должно быть не пустым'
      }
    }
  },
}
</script>

<style scoped>
.logo {
  width: 100px;
  margin-top: 20px;
}

.btn-primary {
  width: 150px;
}

</style>
