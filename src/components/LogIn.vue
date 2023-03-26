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
        /* Написать под сервер вход
        axios
          .post(this.url('/auth/login'), {
            phone: '+7 ' + this.number,
            chatId: '',
            name: '',
            expectedRole: 'ADMIN'
          })
          .then((response) => {
            if (response.data.status === 'FAIL') {
              this.error = 'Ошибка доступа'
            } else {
              this.error = ''
              this.userId = response.data.userId ? response.data.userId : 31
              this.state = 'code'
            }
          })
        //вместо {name: 'Lisa'} передать логин с сервера
         */
        Event.fire('authorised', {name: 'Lisa'})
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
