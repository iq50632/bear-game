<template>
    <brown-dialog v-model="isShow" title="能力值">
      <template #text>
        <v-row align="center">
          <v-col cols="2" class="d-flex">
            <v-icon color="red">mdi-heart</v-icon>
            <span class="ml-1 red--text">HP</span>
          </v-col>
          <v-col cols="10">
            <v-progress-linear color="red lighten-1" :value="HP" rounded height="10" />
          </v-col>
          <v-col cols="2" class="d-flex">
            <v-icon color="blue">mdi-creation</v-icon>
            <span class="ml-1 blue--text">MP</span>
          </v-col>
          <v-col cols="10">
          <v-progress-linear color="blue lighten-1" :value="MP" rounded height="10" />
          </v-col>
          <v-col cols="12" class="d-flex" v-for="i in list" :key="i.id">
            <span class="mx-2 text-left" style="width:80px">{{i.name}}</span>
            <v-progress-linear class="mt-1" color="red lighten-1" 
              :value="$store.state.ability[i.value] + revise[i.value]" rounded height="10" />
            <v-btn icon x-small @click="revise[i.value]--">
              <v-icon color="blue">mdi-minus</v-icon>
            </v-btn>
            <span>{{revise[i.value]}}</span>
            <v-btn icon x-small @click="revise[i.value]++">
              <v-icon color="blue">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template #actions>
        <v-btn dark large class="rounded-xl px-5 mr-10" color="grey" @click="isShow = false">取消</v-btn>
        <v-btn dark large class="rounded-xl px-5 ml-10" color="brown lighten-2" @click="isShow = false">確定</v-btn>
      </template>
    </brown-dialog>
</template>

<script>
import brownDialog from '../brown-dialog'

export default {
  model: {prop: 'show', event: 'change'},
  props: ['show', 'title'],
  data () {
    return {
      revise: {
        STR: 0,
        INT: 0,
        LUK: 0,
        MEN: 0,
        AGL: 0
      },
      list: [
        {
          icon: '',
          name: '力量',
          value: 'STR',
          color: ''
        },
        {
          icon: '',
          name: '智力',
          value: 'INT',
          color: ''
        },
        {
          icon: '',
          name: '幸運',
          value: 'LUK',
          color: ''
        },
        {
          icon: '',
          name: '精神',
          value: 'MEN',
          color: ''
        },
        {
          icon: '',
          name: '迴避',
          value: 'AGL',
          color: ''
        }
      ]
    }
  },
  computed: {
    isShow: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('change', val)
      }
    },
    HP () {
      return this.$store.state.ability.HP
    },
    MP () {
      return this.$store.state.ability.MP
    },
    STR () {
      return this.$store.state.ability.STR
    },
    INT () {
      return this.$store.state.ability.INT
    },
    LUK () {
      return this.$store.state.ability.LUK
    },
    MEN () {
      return this.$store.state.ability.MEN
    },
    AGL () {
      return this.$store.state.ability.AGL
    }
  },
  components: {
    'brown-dialog': brownDialog
  }
}
</script>