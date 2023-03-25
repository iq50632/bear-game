const state = {
  name: '',
  gender: 1,
  brithday: ''
}

const mutations = {
  setPersonal (state, data) {
    state.name = data.name
    state.gender = data.gender
    state.brithday = data.brithday
  }
}

export default {
  state,
  mutations
}
