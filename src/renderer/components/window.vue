<template>
  <div class="text-right"
    @mousedown="mouseDown($event)"
		@mouseup="mouseUp"
    @mousemove="mouseMove($event)">
    <v-card class="rounded-xl" width="520">
      <v-toolbar color="brown lighten-1" dark>
        <span>{{title}}</span>
        <v-btn icon color="white" dark class="ml-auto" @click="$emit('isShow', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
export default {
  model: {prop: 'showWindow', event: 'isShow'},
  props: ['title', 'showWindow'],
  data () {
    return {
      moveWindow: false,
      window: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    mouseDown (e) {
      this.moveWindow = true
      this.window = {
        x: e.x,
        y: e.y
      }
    },
    mouseUp () {
      this.moveWindow = false
    },
    mouseMove (e) {
      if (this.moveWindow) {
        let x = this.window.x - e.x
        x = x - (2 * x)
        let y = this.window.y - e.y
        y = y - (2 * y)
        const pos = {
          x: x,
          y: y
        }
        this.window = {
          x: e.x,
          y: e.y
        }
        this.$emit('pos', pos)
      }
    }
  }
}
</script>