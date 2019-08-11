<template>
  <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <div class="row">
        <HomeBill></HomeBill>
        <HomeCurency></HomeCurency>

        
      </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurency from '@/components/HomeCurency'

export default {
  name: 'home',
},
component: {
  HomeBill,
  HomeCurency
}
</script>


