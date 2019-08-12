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
                  try {
                        console.log('fetchinfo');
                        const uid = await dispatch('getUid')  
                        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                        commit('setInfo',info)
                  } catch (error) {
                        console.log(error);
                        throw error
                        
                  }
                 
            },
            async UpdateInfo({dispatch, commit, getters}, toUpdate) {
                  try {
                        console.log('UpdateInfo')
                        const uid = await dispatch('getUid')
                        const updateData = {...getters.info, ...toUpdate}
                        
                        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                        commit('setInfo', updateData)
                  } catch (e) {
                        console.log(e)
                        commit('SetError', e)
                        throw e
                  }
                  
            }
      },
      getters: {
            info: s => s.info
      }
}