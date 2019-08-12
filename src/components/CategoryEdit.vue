<template>
      <div>
            <div class="col s12 m6">
                    <div>
                      <div class="page-subtitle">
                        <h4>Редактировать</h4>
                      </div>

                      <form @submit.prevent="submitHandler">
                        <div class="input-field" >
                          <select ref="select" v-model="current">
                            <option 
                                  v-for="c in categories"
                                  :key="c.id"
                                  :value="c.id"
                            >{{c.title}}</option>
                          </select>
                          <label>Выберите категорию</label>
                        </div>

                        <div class="input-field">
                          <input
                              id="name"
                              type="text"
                              v-model="title"
                              :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
                          >
                          <label for="name">Название</label>
                          <span class="helper-text invalid" 
                                v-if="$v.title.$dirty && !$v.title.required"
                          >Введите название</span>
                        </div>

                        <div class="input-field">
                          <input
                              id="limit"
                              type="number"
                              v-model.number="limit"
                              :class="{invalid: ($v.title.$dirty && !$v.title.minValue)}"
                          >
                          <label for="limit">Лимит</label>
                          <span class="helper-text invalid"
                                v-if="$v.limit.$dirty && !$v.limit.required"
                          >Минимальная величина {{$v.limit.$params.minValue.min}} </span>
                        </div>

                        <button class="btn waves-effect waves-light" type="submit">
                          Обновить
                          <i class="material-icons right">send</i>
                        </button>
                      </form>
                    </div>
                  </div>
      </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  props:['categories'],
  data() {
    return {
      select:null,
      title: '',
      limit: 100,
      current: null
    }
  },
  methods: {
      async submitHandler() {
        if(this.$v.$invalid) {
          this.$v.$touch
          return
        }

        try {
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          } 
           await this.$store.dispatch('updateCategory', categoryData)
           this.$message('Категория обновлена')
            this.$emit('updated', categoryData)
        } catch (e) {}
      }
  },
  watch: {
    current(id) {
     const {limit, title} = this.categories.find(i => i.id === id)
     this.title = title
     this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()

  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  }
}
</script>