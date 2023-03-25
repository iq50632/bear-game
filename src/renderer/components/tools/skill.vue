<template>
    <brown-dialog v-model="isShow" title="技能" width="800">
      <template #text>
        <v-timeline align-top style="width:800px">
          <v-timeline-item v-for="(item, i) in items" :key="i"
            :color="item.color" :icon="item.icon" fill-dot>
            <v-card :color="item.color" dark>
              <v-card-title class="text-h6">
                {{item.name}}
              </v-card-title>
              <v-card-text class="white text--primary">
                <p>{{item.text}}</p>
                <v-btn @click="item.num--" :color="item.color" icon small>
                  <v-icon class="pa-2">mdi-minus</v-icon>
                </v-btn>
                {{item.num}}
                <v-btn @click="item.num++" :color="item.color" icon small>
                  <v-icon class="pa-2">mdi-plus</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
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
      items: [
        {
          color: 'red lighten-2',
          icon: 'mdi-star',
          name: '熊熊普攻',
          text: '就是攻擊',
          num: 0
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-book-variant',
          name: '熊熊之力',
          text: '125%的攻擊力',
          num: 0
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-book-variant',
          name: '熊之呼吸',
          text: '使攻擊力在100秒內變成200%，攻擊速度增加150%',
          num: 0
        },
        {
          color: 'indigo',
          icon: 'mdi-book-variant',
          name: '熊之祝福',
          text: '',
          num: 0
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
    }
  },
  components: {
    'brown-dialog': brownDialog
  }
}
</script>