import firebase from '@firebase/app'

export default {
      actions: {
            async createRecord({dispatch,commit}, record) {
                  try {
                        const uid = await dispatch('getUid')
                        return await firebase.database().ref(`/users/${uid}/records`).push(record)
                        console.log('creterecords');
                        
                  } catch (error) {
                        console.log(error)
                        commit('SetError', error)
                        throw error
                        
                  }
            }
      }
}