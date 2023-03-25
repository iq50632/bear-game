<template>
  <div class="bg">
    <v-snackbar v-model="snackbar.show" multi-line rounded="pill" top color="primary" text elevation="6">
      {{ snackbar.text }}
      <template #action="{ attrs }">
        <v-btn color="primary" icon v-bind="attrs" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <div class="from">
      <v-btn @click="$router.push({name: 'Home'})">go</v-btn>
      <img v-for='(i, index) in attackList' :key='index'
        width="35" height="35" :src="icon" alt="Attack"
        :style="{'position': 'absolute',
          'transition': 'all .5s ease-out',
          'left': i.left, 'bottom': i.bottom}">
      <img :style="penguinStyle" width="100" height="100" alt="Penguin"
        :src="require('../assets/' + penguinImg)">
        <div class="obstacle pa-6 secondary rounded-t-xl"/>
    </div>
    <tools class="navbar" />
    
    <v-btn class="chatroom" icon x-large color="white" dark @click="showFriend = !showFriend">
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>
    <window :style="chatRoomPos" v-if="showFriend"
      width="520" title="聊天室" v-model="showFriend" @pos="moveChatroom">
      <chatroom v-model="chatting" />
    </window>
  </div>
</template>

<script>
import window from './window'
import tools from './tools/tools'
import chatroom from './chatroom'
const { remote } = require('electron')

export default {
  data () {
    return {
      penguinStyle: {
        position: 'absolute',
        transform: 'scaleX(1)',
        left: '0px',
        bottom: '0px',
        transition: '.5s ease-out'
      },
      attackId: -1,
      attackList: {},
      obstacle: {
        height: 48,
        left: 380,
        right: 580
      },
      penguinImg: 'Penguin_left.png',
      icon: require('../assets/icon.png'),
      snackbar: {
        show: false,
        text: ''
      },
      chatting: false,
      showFriend: false,
      chatRoomPos: {
        position: 'absolute',
        top: '0px',
        left: '0px'
      }
    }
  },
  mounted () {
    const that = this
    document.addEventListener('keydown', that.watchEnter)
  },
  brforeDestroy () {
    const that = this
    document.removeEventListener('keydown', that.watchEnter)
  },
  methods: {
    async watchEnter (e) {
      const key = window.event ? e.keyCode : e.which
      let bottom = Number(this.penguinStyle.bottom.split('px')[0])
      let left = Number(this.penguinStyle.left.split('px')[0])
      if (!this.chatting) {
        if (['Regain_strength.png', 'Greet.gif'].includes(this.penguinImg)) {
          // CD
          console.log(key)
          if (this.penguinImg === 'Regain_strength.png') {
            this.snackbar = {
              show: true,
              text: '補血中，請稍後在移動'
            }
          } else if (this.penguinImg === 'Greet.gif') {
            this.snackbar = {
              show: true,
              text: '有禮貌點，不要中斷打招呼'
            }
          }
        } else {
          // move
          if (key === 27) {
            let window = remote.getCurrentWindow()

            console.log(window.isFullScreen())
            window.setFullScreen(true)
          }

          if (key === 38 || key === 32) {
            this.jump(left, bottom)
          } else if (key === 39) {
            left += 10
            this.penguinStyle.left = left + 'px'
            this.penguinStyle.transform = 'scaleX(1)'
          } else if (key === 37) {
            left -= 10
            this.penguinStyle.left = left + 'px'
            this.penguinStyle.transform = 'scaleX(-1)'
          } else if (key === 40) {
            // console.log(key, 'down')

          }
          if ([37, 39].includes(key)) {
            if (left > this.obstacle.left && left < this.obstacle.right) {
              // pass
            } else {
              this.penguinStyle.bottom = '0px'
            }
          }
          if (key === 90) {
            // Z Regain strength
            this.regainStrength()
          } else if (key === 67) {
            // C Attack
            this.bearAttack(left, bottom)
          } else if (key === 69) {
            // E Greet
            this.greet()
          }
        }
      }
    },
    async jump (left, bottom) {
      bottom += 50
      this.penguinStyle.bottom = bottom + 'px'
      if (left > this.obstacle.left && left < this.obstacle.right) {
        bottom = this.obstacle.height
      } else {
        bottom = 0
      }
      await this.sleep(500)
      this.penguinStyle.bottom = bottom + 'px'
    },
    async bearAttack (left, bottom) {
      if (this.MP < 10) {
        this.notification('熊熊警報！ 熊熊警報！ 請盡快補魔！！')
      } else {
        this.attackId += 1
        const id = 'bear_' + this.attackId
        console.log('bear attack!!')
        this.attackList[id] = {
          left: (left + 10) + 'px',
          bottom: (bottom + 20) + 'px'
        }
        this.MP = this.MP - 10

        await this.sleep(100)
        this.attackList[id].left = '100%'
      }
    },
    async regainStrength () {
      this.penguinImg = 'Regain_strength.png'
      this.HP = this.HP + 30
      this.MP = this.MP + 30
      await this.sleep(3000)
      this.penguinImg = 'Penguin_left.png'
    },
    async greet () {
      console.log('Penguin say hello.')
      this.penguinImg = 'Greet.gif'
      await this.sleep(5000)
      this.penguinImg = 'Penguin_left.png'
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    notification (context) {
      const notification = new Notification('Bear Notification', {
        subtitle: '副標題', // macOS
        body: context,
        silent: true,
        icon: this.icon,
        timeoutType: 'default'
      })
      notification.onclick = () => {
        console.log('通知被點擊')
      }
    },
    moveChatroom (value) {
      const left = parseInt(this.chatRoomPos.left.split('px')[0])
      const top = parseInt(this.chatRoomPos.top.split('px')[0])
      this.chatRoomPos.left = left + value.x + 'px'
      this.chatRoomPos.top = top + value.y + 'px'
    }
  },
  computed: {
    HP: {
      get () {
        if (this.$store.state.ability.HP < 30) {
          this.notification('熊熊警報！ 熊熊警報！ 請盡快補血！！')
        }
        return this.$store.state.ability.HP
      },
      set (value) {
        this.$store.commit('setHP', value)
      }
    },
    MP: {
      get () {
        if (this.$store.state.ability.MP < 30) {
          this.notification('熊熊警報！ 熊熊警報！ 請盡快補魔！！')
        }
        return this.$store.state.ability.MP
      },
      set (value) {
        this.$store.commit('setMP', value)
      }
    }
  },
  components: {
    tools,
    chatroom,
    window
  }
}
</script>

<style scoped>

.from {
  position: relative;
  width: 100vw;
  height: 94vh;
  margin-bottom: 16px;
}

.obstacle {
  width: 200px;
  position: absolute;
  left: 380px;
  bottom: 0;
}

.navbar {
  position: absolute;
  left: 30px;
  top: 30px;
}

.chatroom {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>