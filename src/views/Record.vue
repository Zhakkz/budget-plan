<template>
      <div>
            <div>
              <div class="page-title">
                <h3>Новая запись</h3>
              </div>

              <Loader v-if="loading"></Loader>
              <p class="center" v-else-if="!categories.length">категорию пока НЕТ <router-link to="/categories">Добавить новую категорию</router-link></p>
              <form class="form" v-else @submit.prevent="submitHandler">
                <div class="input-field" >
                  <select ref="select" v-model="category">
                    <option
                      v-for="c in categories"
                      :key="c.id"
                      :value="c.id"
                    >{{c.title}}</option>
                  </select>
                  <label>Выберите категорию</label>
                </div>

                <p>
                  <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="income"
                        v-model="type"
                    />
                    <span>Доход</span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="outcome"
                        v-model="type"
                    />
                    <span>Расход</span>
                  </label>
                </p>

                <div class="input-field">
                  <input
                      id="amount"
                      type="number"
                      v-model.number="amount"
                      :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)}"
                  >
                  <label for="amount">Сумма</label>
                  <span class="helper-text invalid"
                        v-if="$v.amount.$dirty && !$v.amount.minValue"
                  >Минимальн</span>
                </div>

                <div class="input-field">
                  <input
                      v-model="description"
                      id="description"
                      type="text"
                      :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
                  >
                  <label for="description">Описание</label>
                  <span
                        class="helper-text invalid"
                        v-if="$v.description.$dirty && !$v.description.required"
                  >Введите описание</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                  Создать
                  <i class="material-icons right">send</i>
                </button>
              </form>
            </div>
      </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  name: 'record',
  data() {
    return {
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 100,
      description: ''
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
        if(this.type === "income") {
          return true
        }

        return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if(this.canCreateRecord) {

        try {
              await this.$store.dispatch('createRecord', {
              categoryId: this.category,
              amount: this.amount,
              description: this.description,
              type: this.type,
              date: new Date().toJSON()
            })
            const bill = this.type === 'income' 
            ? this.info.bill + this.amount :
            this.info.bill - this.amount
            
            

            await this.$store.dispatch("UpdateInfo", {bill})
            this.$message('Запис успешно создана')
            this.$v.$reset() 
            this.amount = 1
            this.description = ""
        } catch (error) {}
      }else{
        this.$message('Не достаточно средств на счете')
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    if(this.categories.length) {
      this.category = this.categories[0].id
    }
    this.loading = false
    setTimeout(() => {
          this.select = M.FormSelect.init(this.$refs.select)
          M.updateTextFields()
    }, 0);

  },
  validations: {
    amount: {minValue: minValue(100)},
    description: {required}
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>