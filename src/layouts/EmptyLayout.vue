<template>
      <div>
            <div class="grey darken-1 empty-layout">
            <router-view></router-view>
            </div>
      </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
      computed: {
            error() {
                  return this.$store.getters.error
            }
      },
      watch: {
            error(fberror){
                  this.$error(messages[fberror.code] || 'Что то пошло не так')
            }

      }
}
</script>


