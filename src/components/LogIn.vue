<template>
  <div class="content-container" style="width: 350px;">
    <div class="card">
      <div class="text-center">
        <img :src="images.logo" class="card-img-top logo" alt="...">
      </div>
      <div class="card-body">
        <h5 class="card-text label-light">Вход в мессенджер</h5>
        <input type="text" class="form-control shadow-none" v-model="email" placeholder="e-mail"/>
        <small class="card-text error">{{ error }}</small><br>
        <button class="btn btn-primary shadow-none" @click="get_code()">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  props: ['user'],
  components: {},
  data() {
    return {
      email: '',
      error: '\n'
    }
  },
  computed: {},
  methods: {
    get_code: function () {
      if (this.email_re.exec(this.email)) {
        axios
          .post(this.url('/v1/user'), {
            user_id: this.email
          })
          .then((response) => {
            console.log(response)
            if (response.data.status === 'FAIL') {
              this.error = 'Ошибка доступа'
            } else {
              this.error = ''
              this.user = response.data.user
              if (!this.user) {
                this.error = 'Ошибка аторизации'
              } else {
                Event.fire('authorised', this.user)
              }
            }
          })
      } else {
        this.error = 'Пожалуйста, проверьте корректность ввода'
      }
    }
  }
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
