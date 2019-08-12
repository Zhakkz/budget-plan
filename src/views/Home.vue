<template>
  <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <Loader v-if="loading"></Loader>

      <div v-else class="row">
        <HomeBill
          :rates="currency.rates"
        ></HomeBill>
        <HomeCurency 
          :rates="currency.rates"
          :date="currency.date"
        ></HomeCurency>

        
      </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurency from '@/components/HomeCurency'

export default {
  name: 'home',
  data() {
    return {
      loading:true,
      currency:false
    }
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')    
    this.loading = false
  },
  components: {
      HomeBill,
      HomeCurency
  }
}

</script>


