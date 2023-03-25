<template>
  <v-menu ref="menu" v-model="pickerMenu" max-width="320px" min-width="auto"
    :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y>
    <template #activator="{ on, attrs }">
      <v-text-field hide-details color="brown lighten-1" v-model="date" readonly solo v-bind="attrs" v-on="on"/>
      <!--  prepend-icon="mdi-calendar" class="ml-10" -->
    </template>
    <v-date-picker v-model="date" :type="type" color="brown lighten-1" scrollable :allowed-dates="allowedMonths" locale="zh-TW">
      <v-btn text color="brown lighten-1" @click="pickerMenu = false">取消</v-btn>
      <v-spacer />
      <v-btn text color="brown lighten-1" @click="$refs.menu.save(date)">確定</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  model: {prop: 'date', event: 'change'},
  props: ['type', 'date'],
  data () {
    return {
      currentTime: '',
      pickerMenu: false
    }
  },
  methods: {
    allowedMonths (val) {
      return val
    }
  }
}
</script>