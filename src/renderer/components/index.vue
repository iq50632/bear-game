<template>
  <div class="bg">
    <img src="~@/assets/icon.png" width="100" >
    <h1 class="mb-15">Welcome to Bear World! Bro</h1>
    <v-btn color="primary" elevation="2" outlined @click.stop="showPersonal = true">Go World!</v-btn>
    <brown-dialog v-model="showPersonal" title="基本資料">
      <template #text>
        <v-row align="center" color="primary">
          <v-col cols="4">
            名字：
          </v-col>
          <v-col cols="8">
            <v-text-field hide-details v-model="personalInfo.name" solo @keyup.enter="playGame" />
          </v-col>
          <v-col cols="4">
            性別：
          </v-col>
          <v-col cols="8">
            <v-radio-group v-model="personalInfo.gender" row>
              <v-radio label="男" value="1" />
              <v-radio label="女" value="2" />
            </v-radio-group>
          </v-col>
          <v-col cols="4">
            生日：
          </v-col>
          <v-col cols="8">
            <calendar type="date" v-model="personalInfo.brithday"/>
          </v-col>
        </v-row>
      </template>
      <template #actions>
        <v-btn dark large class="rounded-xl px-5" color="brown lighten-1" @click="playGame">進行遊戲</v-btn>
      </template>
    </brown-dialog>
  </div>
</template>

<script>
import calendar from './calendar'
import brownDialog from './brown-dialog'
import moment from 'moment'

export default {
  name: 'App',
  data () {
    return {
      showPersonal: false,
      personalInfo: {
        name: '',
        gender: 1,
        brithday: moment().format('YYYY-MM-DD')
      }
    }
  },
  components: {
    calendar,
    'brown-dialog': brownDialog
  },
  methods: {
    playGame () {
      this.showPersonal = false
      this.$store.commit('setPersonal', this.personalInfo)
      this.$router.push({name: 'Game'})
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>

<style scoped>
  .personal {
    transition-property: opacity, left;
    transition: all .5s;
  }
  .col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col-auto, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-auto, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md-auto, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-auto {
    padding: 0;
  }
  .bg {
    background-color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>