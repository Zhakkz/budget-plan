import firebase from '@firebase/app'

export default {
      state: {
            info:{}
            
      },
      mutations: {
            setInfo(state, info) {
                  console.log(info);
                  state.info = info
            },
            clearInfo(state) {
                  state.info = {}
            }
      },
      actions: {
            async fetchinfo({dispatch,commit}) {
            
                 const uid = await dispatch('getUid')
                 
                 const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                 console.log('fetchinfo')
                 commit('setInfo',info)
                 
                 
            }
      },
      getters: {
            info: s => s.info
      }
}