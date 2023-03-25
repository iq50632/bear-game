<template>
  <v-dialog v-model="isShow" :width="width || 500" class="rounded-xl" scrollable>
    <v-card class="rounded-xl">
      <v-toolbar color="brown lighten-1" dark>
        {{title}}
      </v-toolbar>
      <v-card-text class="pa-15">
        <v-row align="center">
          <slot name="text"></slot>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center pb-5">
      <slot name="actions"></slot>
      </v-card-actions>
      
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  model: {prop: 'show', event: 'change'},
  props: ['show', 'title', 'width'],
  computed: {
    isShow: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  }
}
</script>