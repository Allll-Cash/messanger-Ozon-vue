<template>
  <div>
    <h1>Новый диалог:</h1>
    <br>
    <h6>Название: </h6>
    <textarea class="form-control" v-model="name"/>
    <br>
    <h6>Участники (e-mail): </h6>
    <div v-for="email in emails">
      <textarea class="form-control email"/>
    </div>
    <div class="counts">
      <button class="btn dialog-btn cnt-btn" @click="add_email()">
        Добавить
      </button>
      <button class="btn dialog-btn cnt-btn" @click="remove_email()">
        Удалить
      </button>
    </div>
    <small class="card-text error">{{ error }}</small><br>
    <button class="btn dialog-btn confirm" @click="create_dialog()">
      Создать диалог
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "DialogsCreatorFull",
  props: ['user'],
  data() {
    return {
      emails: [''],
      name: '',
      error: '\n'
    }
  },
  computed: {},
  methods: {
    create_dialog() {
      if (this.is_empty(this.name)) {
        this.error = 'Название не может быть пустым'
        return
      }
      const emails = document.getElementsByClassName('email')
      console.log(emails)
      const last_emails = this.emails
      this.emails = [this.user.id]
      for (let i = 0; i < emails.length; i += 1) {
        // alert(emails.item(i).value)
        const email = emails.item(i).value
        if (!this.email_re.exec(email)) {
          this.error = 'Email участника ' + (i + 1) + ' не является валидым ("' + email + '")'
          this.emails = last_emails
          return
        }
        if (this.user.id === email) {
          this.error = 'Не нужно указывать себя как участника'
          this.emails = last_emails
          return
        }
        if (this.emails.includes(email)) {
          this.error = 'Нельзя указать одного человека дважды (' + email + ')'
          this.emails = last_emails
          return
        }
        this.emails.push(email)
      }
      this.error = '\n'
      console.log(this.emails)

      axios
        .post(this.url('/v1/dialog'),
          {
            members: this.emails,
            meta: {'name': this.name}
          }
        )
        .then((response) => {
          let dialogAndUser = {"dialog" : response.data.dialog, "user" : this.user}
          Event.fire('open-dialog', dialogAndUser)
        })
    },
    add_email() {
      this.emails.push('')
      this.error = '\n'
    },
    remove_email() {
      this.emails.pop()
      this.error = '\n'
    },
    load() {
      alert('i am load')
    }
  },
  created() {
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

.confirm {
  font-size: x-large;
}

.dialog-btn:hover, .dialog-btn:active {
  background-color: #f0f3f6 !important;
  border-color: #f0f3f6 !important;
}

.form-control {
  height: 34px;
}

.counts {
  display: flex;
}

.cnt-btn {
  margin: 10px;
}

textarea {
  white-space: nowrap;
}

</style>
