<template>
      <div>
            <div>
                <div class="page-title">
                  <h3>Планирование</h3>
                  <h4>{{info.bill | currency('RUB')}}</h4>
                </div>

                <Loader v-if="loading"></Loader>
                <p class="center" v-else-if="!categories.length">категорию пока НЕТ <router-link to="/categories">Добавить новую категорию</router-link></p>
  
                <section v-else>
                  <div v-for="c in categories" :key="c.id">
                    <p>
                      <strong>{{c.title}}</strong>
                      {{c.spend | currency('RUB')}} из {{c.limit | currency('RUB')}}
                    </p>
                    <div class="progress" >
                      <div
                          class="determinate green"
                          :class="[c.progressColor]"
                          :style="{'width': c.progressPercent + '%'}"
                      ></div>
                    </div>
                  </div>
                </section>
              </div>
      </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'planning',
  data() {
    return {
      loading: true,
      categories: []
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
        const records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')

        this.categories = categories.map( i => {
          const spend = records
          .filter(r => r.categoryId === i.id)
          .filter(r => r.type === "outcome")
          .reduce((total, record) => {
            return total += +record.amount
          },0)

          const percent = 100 * spend / i.limit
          const progressPercent = percent > 100 ? 100 : percent
          const progressColor = percent <  60 ? 'green' : percent < 100 ? 'yellow' : 'red'
          
          return {
            ...i,
            progressPercent,
            progressColor,
            spend
          }
    } )
    
    console.log('planning')
    
    this.loading = false
  },
}
</script>