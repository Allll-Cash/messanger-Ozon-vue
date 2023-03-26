<template>
  <div>
    <foo name="dialog" width="600px" height="700px">
      <dialog-card :user="user" :dialog="current_dialog"/>
    </foo>

    <!-- Данные -->
    <div class="content-container" :style="`top: ${window_height / 2}px;`" v-if="loading">
      <loading/>
    </div>
    <div class="row" style="padding-right: 15px;" v-if="!loading">
      <div v-if="!filtered_data.length">
        Нет диалогов
      </div>
      <div class="col-3" style="padding-right: 0; margin-bottom: 5px;" v-for="dialog in filtered_data" :id="dialog.id">
        <dialog-presenter :dialog="dialog">
          <button class="btn btn-sm btn-danger" @click="open_dialog(dialog)">Открыть
          </button>
        </dialog-presenter>
      </div>
    </div>

  </div>
</template>

<script>
import Loading from "../parts/Loading.vue";
import axios from "axios";
import FormGroup48 from "../parts/FormGroup-4-8.vue";
import DialogCard from "../parts/DialogCard.vue";
import DialogPresenter from "../parts/DialogPresenter.vue";

export default {
  name: "DialogsManager",
  props: ['user'],
  components: {DialogPresenter, DialogCard, FormGroup48, Loading},
  data() {
    return {
      loading: false,
      filters: {
        date: undefined,
        table: undefined
      },
      tables: [],
      dialogs: [],
      current_dialog: {},
      flags: {
        done: false
      }
    }
  },
  computed: {
    filtered_data() {
      let filtered = this.dialogs
      // фильтровать тут
      return filtered
    }
  },
  methods: {
    update: function () {
      this.load()
    },
    open_dialog: function (dialog) {
      this.current_dialog = dialog
      this.$modal.show('dialog')
    },
    load: function () {
      // this.loading = true
      // тут загружать список диалогов
      /*
            axios
              .get(this.url('/booking/by-date'), {params: {}})
              .then((response) => {
                this.data = response.data.bookings
                this.loading = false
              })

       */
      this.dialogs = [{
        name: 'Nadia',
        last_message: 'Hello'
      }]
    }
  },
  created() {
  },
  mounted() {
    this.load()
    this.$modal.hide('dialog')
  }
}
</script>

<style scoped>

</style>
