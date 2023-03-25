const state = {
  HP: 0,
  MP: 0,
  STR: 0,
  INT: 0,
  LUK: 0,
  MEN: 0,
  AGL: 0
}

const mutations = {
  setHP (state, data) {
    if (data > 100) {
      state.HP = 100
    } else {
      state.HP = data
    }
  },
  setMP (state, data) {
    if (data > 100) {
      state.MP = 100
    } else {
      state.MP = data
    }
  },
  setSTR (state, data) {
    state.STR += data
  },
  setINT (state, data) {
    state.INT += data
  },
  setLUK (state, data) {
    state.LUK += data
  },
  setMEN (state, data) {
    state.MEN += data
  },
  setAGL (state, data) {
    state.AGL += data
  }
}

export default {
  state,
  mutations
}
