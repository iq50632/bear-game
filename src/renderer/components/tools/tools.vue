<template>
  <div>
    <v-card flat tile class="rounded-lg" elevation="6" height="100" width="520">
      <v-card-text class="d-flex align-center">
        <v-menu absolute offset-y rounded="lg">
          <template #activator="{ on, attrs }">
            <img alt="Bear logo" :src="icon" width="50" v-bind="attrs" v-on="on">
            <p class="text-no-wrap mb-0 mx-3">{{name}}</p>
          </template>
          <v-list>
            <v-list-item @click="isAbility = true">
              能力值
            </v-list-item>
            <v-list-item>
              成就
            </v-list-item>
            <v-list-item @click="isSkill = true">
              技能
            </v-list-item>
            <v-list-item @click="exit">
              登出
            </v-list-item>
          </v-list>
        </v-menu>
        <div style="width: 100%">
          <div class="d-flex align-center">
            <v-btn icon color="red" class="mx-5">
              <v-icon>mdi-heart</v-icon>HP
            </v-btn>
            <v-progress-linear color="red lighten-1" :value="HP" />
          </div>
          <div class="d-flex align-center">
            <v-btn icon color="blue" class="mx-5">
              <v-icon>mdi-creation</v-icon>MP
            </v-btn>
            <v-progress-linear color="blue lighten-1" :value="MP" />
          </div>
        </div>
      </v-card-text>
    </v-card>
    <ability v-model="isAbility" />
    <skill v-model="isSkill" />
  </div>
</template>

<script>
import ability from './abilityValue'
import skill from './skill'
const { ipcRenderer } = require('electron')

export default {
  data () {
    return {
      isAbility: false,
      isSkill: false,
      icon: require('@/assets/icon.png')
    }
  },
  methods: {
    exit () {
      ipcRenderer.send('close')
    }
  },
  computed: {
    name () {
      return this.$store.state.personal.name
    },
    HP () {
      return this.$store.state.ability.HP
    },
    MP () {
      return this.$store.state.ability.MP
    }
  },
  components: {
    ability,
    skill
  }
}
</script>