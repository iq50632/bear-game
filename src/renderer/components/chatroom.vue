<template>
  <div class="text-right">
      <v-card-text class="pa-5 overflow-auto" style="height: 450px;">
        <v-row align="center">
          <v-col cols="12" v-for="(i, index) in chatHistory" :key="i.index">
            <v-row align="center" v-if="i.name == name">
              <v-col cols="8" offset="2" style="position: relative;"
                @contextmenu="clickMsg($event, index)" v-click-outside="OnOutsideMsg">
                <div class="msg" :style="{'background-color': i.color}">{{i.msg}}</div>
                <div class="msg-right" :style="{'border-color': 'transparent transparent transparent ' + i.color}" />
              </v-col>
              <v-col cols="2" class="text-center">
                <img :src="i.img" width="50" height="50" alt="">
                <br>
                <span>{{i.name}}</span>
              </v-col>
            </v-row>
            <v-row align="center" v-else>
              <v-col cols="2" class="text-center">
                <img :src="i.img" width="50" height="50" alt="">
                <br>
                <span>{{i.name}}</span>
              </v-col>
              <v-col cols="8" class="text-left" style="position: relative;"
                @contextmenu="clickMsg($event, index)" v-click-outside="OnOutsideMsg">
                <div class="msg-left" :style="{'border-color': 'transparent ' + i.color + ' transparent transparent'}" />
                <div class="msg white--text" :style="{'background-color': i.color}">{{i.msg}}</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-toolbar color="brown lighten-1" class="rounded-b-xl" dark>
        <v-textarea v-model="msg" auto-grow rows="1" @focus="isChat()" @blur="isChat()"  @keyup.enter="send" />
        <v-btn icon color="white" dark @click="send">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-toolbar>
    <v-menu
      v-model="showMsgMenu" absolute offset-y
      :position-x="menu.x" :position-y="menu.y">
      <v-list>
        <v-list-item @click="delMsg">
          刪除
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
  model: {prop: 'chatting', event: 'changeChatting'},
  props: ['chatting'],
  data () {
    return {
      showMsgMenu: false,
      menu: {
        x: 0,
        y: 0
      },
      chatHistory: [],
      msg: '',
      icon: require('../assets/icon.png'),
      catImg: require('../assets/cat.png'),
      selectIndex: ''
    }
  },
  methods: {
    send () {
      this.chatHistory.push({
        name: this.name,
        img: this.icon,
        msg: this.msg,
        color: '#c5b8b4'
      })
      this.chatHistory.push({
        name: 'Cat',
        img: this.catImg,
        msg: '蛤?',
        color: '#8d6e63'
      })
      this.msg = ''
    },
    clickMsg (e, index) {
      this.menu.x = e.x
      this.menu.y = e.y
      this.showMsgMenu = true
      this.selectIndex = index
    },
    OnOutsideMsg () {
      this.showMsgMenu = false
      this.selectIndex = ''
    },
    delMsg () {
      this.chatHistory.splice(this.selectIndex, 1)
      this.selectIndex = ''
    },
    isChat () {
      this.$emit('changeChatting', !this.chatting)
    }
  },
  computed: {
    name () {
      return this.$store.state.personal.name
    }
  }
}
</script>

<style scoped>
  .chat-room {
    position: absolute;
    left: 0;
  }
  .msg-left {
    position: absolute;
    bottom: 25px;
    left: -25px;
    border-color: transparent #a8a8a8 transparent transparent;
    border-style: solid solid solid solid;
    border-width: 0px 20px 15px 20px;
  }

  .msg-right {
    position: absolute;
    bottom: 25px;
    right: -25px;
    border-color: transparent transparent transparent #a8a8a8;
    border-style: solid solid solid solid;
    border-width: 0px 20px 15px 20px;
  }

  .msg {
    /* width: 100%; */
    /* height: 80px; */
    padding: 1.2rem;
    background-color: #a8a8a8;
    border-radius: 1.2rem;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-button {
    background: transparent;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid slategrey;
  }

  ::-webkit-scrollbar-track {
    box-shadow: transparent;
  }
</style>