<template>
  <div>
    <h1>Информация о диалоге:</h1>
    <br>
    <h4>Название: {{ get_name() }}</h4>
    <div class="row-name">
      <textarea class="form-control name-ta" rows="1" v-model="name"/>
      <button class="btn dialog-btn name-btn" @click="change_name()">
        Изменить название
      </button>
    </div>
    <small class="card-text error">{{ error_name }}</small><br>
    <h4>Участники: </h4>
    <div v-for="user in users">
      <h6>{{ user_info(user) }}</h6>
    </div>
    <div class="row-email">
      <textarea class="form-control email-ta" rows="1" v-model="email"/>
      <button class="btn dialog-btn add-btn" @click="add()">
        Добавить участника
      </button>
    </div>
    <small class="card-text error">{{ error_email }}</small><br>
    <button class="btn dialog-btn exit-btn" @click="exit()">
      Выйти из чата
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "DialogsUpdater",
  props: ['user', 'dialog'],
  data() {
    return {
      users: [],
      error_name: '\n',
      error_email: '\n',
      name: '',
      email: ''
    }
  },
  computed: {},
  methods: {
    user_info(user) {
      let text = user.meta.name + ' '
      if (user.meta.surname) {
        text = text + user.meta.surname + ' '
      }
      return text + '(' + user.id + ')'
    },
    get_name() {
      console.log('get-name', this.dialog)
      if (this.dialog) {
        return this.dialog.meta.name
      }
      return ''
    },
    load() {
      axios
        .get(this.url('/v1/dialog/' + this.dialog.id))
        .then((response) => {
          console.log(response)
          this.dialog = response.data.dialog
          this.users = response.data.users
        })
      setTimeout(() => this.load(), 1000)
    },
    add() {
      this.error_name = '\n'
      this.error_email = '\n'
      if (!this.email_re.exec(this.email)) {
        this.error_email = 'Email участника не является валидым ("' + this.email + '")'
        return
      }
      for (const user of this.users) {
        if (user.id === this.email) {
          this.error_email = 'Участник уже в чате'
          return
        }
      }
      axios
        .patch(this.url('/v1/dialog/join'), {
          dialog_id: this.dialog.id,
          user_id: this.email
        })
        .then((response) => {
          console.log(response)
          this.dialog = response.data.dialog
          axios.get(this.url('/v1/user/' + this.email)).then((response) => {
            this.users.push(response.data.user)
          })
        })
    },
    exit() {
      axios
        .patch(this.url('/v1/dialog/leave'), {
          dialog_id: this.dialog.id,
          user_id: this.user.id
        })
        .then((response) => {
          Event.fire('exit-dialog')
        })
    },
    change_name() {
      this.error_name = '\n'
      this.error_email = '\n'
      if (this.is_empty(this.name)) {
        this.error_name = 'Название не должно быть пустым!'
        return
      }
      axios
        .patch(this.url('/v1/dialog'), {
          dialog_id: this.dialog.id,
          meta: {'name': this.name}
        })
        .then((response) => {
          console.log(response)
          this.dialog = response.data.dialog
        })
    }
  },
  created() {
    this.load()
  }
}
</script>

<style scoped>

.dialog-btn {
  border-radius: 0;
  background-color: white;
  border-color: white;
  width: 100%;
  height: 100%;
  text-align: center;
  border-bottom: #f0f3f6 1px solid;
  color: #265bf5;
}

.dialog-btn:hover, .dialog-btn:active {
  background-color: lightgray !important;
  border-color: lightgray !important;
}

.exit-btn {
  color: red;
}

.row-name, .row-email {
  display: flex;
}

.name-ta, .email-ta {
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
}

.name-btn, .add-btn {
  width: auto;
  min-width: 210px;
}

.form-control {
  height: 34px;
}

</style>
