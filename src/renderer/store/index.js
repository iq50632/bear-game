import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'

import modules from './modules'
import personal from './modules/personal'
import ability from './modules/ability'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  personal,
  ability,
  plugins: [
    createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
