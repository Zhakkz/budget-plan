import firebase from '@firebase/app'

export default {
      actions: {
            async createRecord({dispatch,commit}, record) {
                  try {
                        const uid = await dispatch('getUid')
                        return await firebase.database().ref(`/users/${uid}/records`).push(record)
                        console.log('creterecords')
                        
                  } catch (error) {
                        console.log(error)
                        commit('setError', error)
                  
                      
                        
                  }
            },
            async fetchRecords({dispatch, commit}) {
                  try {
                        const uid = await dispatch('getUid')
                        const records =  (await firebase.database().ref(`/users/${uid}/records`).once('value')).val()
                        return Object.keys(records).map( key => ({...records[key], id:key}))

                  } catch (e) {
                        console.log(e)
                        return []
                        throw e

                  }
                  
            } 
      }
}