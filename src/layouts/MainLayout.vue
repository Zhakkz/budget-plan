<template> 

            <div class="app-main-layout" >
                  <Navbar @click="isOpen = !isOpen"></Navbar>
                  <Sidebar v-model="isOpen"></Sidebar>
                  <main class="app-content" :class="{full:!isOpen}">
                        <div class="app-page">

                              <router-view></router-view>

                        </div>
                  </main>

                  <div class="fixed-action-btn">
                        <router-link class="btn-floating btn-large blue" to="/record">
                              <i class="large material-icons">add</i>
                        </router-link>
                  </div> 
            </div>
</template>
<script>
import Sidebar from '@/components/app/Sidebar'
import Navbar from '@/components/app/Navbar'

export default {
      name:'main-layout',
      data() {
            return {
                  isOpen: true,
                  dataReady:false
            }
      },
      components:{
            Sidebar,Navbar
      },
      async mounted() {
            if(!Object.keys(this.$store.getters.info).length) {
                  console.log('Name');
                  
                 await this.$store.dispatch('fetchinfo')
                 this.dataReady = true
            }

      }
      
}
</script>