<template>
<div class="user-view">
  <component :is="currentComponent"></component>
  <div class="buttons">
    <b-button class="left" v-on:click="onClickLeft">
      {{"<"}}
    </b-button>
    <b-button class="right" v-on:click="onClickRight">
      {{">"}}
    </b-button>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import MainView from "./PanelViews/MainView";
import StartView from "./PanelViews/StartView";
import RevealView from "./PanelViews/RevealView";

let channelID = "";
const twitch = window.Twitch.ext;

export default {
  name: 'Panel',
  components: {
    MainView,
    StartView,
    RevealView
  },
  data() {
    return {
      currentComponent: "MainView",
      tabs: [1, 2, 3]
    }
  },
  sockets: {
    connect: () => {},
    Campain_State: function({
      mosaicState,
      donationTotal,
      donationGoal,
      donators
    }) {
      twitch.rig.log("User has recieved new Campain State");
      this.setMosaicState(mosaicState);
      this.setDonationTotal(donationTotal);
      this.setDonationGoal(donationGoal);
      this.setDonators(donators);
    },
  },
  methods: {
    ...mapActions(['setMosaicState', 'setDonationGoal', 'setDonationTotal', 'setDonators', 'setChannelID']),
    onClickLeft() {
      if (this.currentComponent === 'MainView') {
        this.currentComponent = 'MainView';
      } else if (this.currentComponent === 'StartView') {
        this.currentComponent = 'MainView';
      } else if (this.currentComponent === 'RevealView') {
        this.currentComponent = 'StartView';
      }
    },
    onClickRight() {
      if (this.currentComponent === 'MainView') {
        this.currentComponent = 'StartView';
      } else if (this.currentComponent === 'StartView') {
        this.currentComponent = 'RevealView';
      } else if (this.currentComponent === 'RevealView') {
        this.currentComponent = 'RevealView';
      }
    }
  },
  computed: {
    ...mapGetters(['getMosaicState', 'getDonationGoal', 'getDonators', 'getDonationTotal', 'getChannelID']),
    isMainState() {
      return this.getMosaicState === "Start";
    },
    isDonationState() {
      return this.getMosaicState === "Stop";
    },
    isRevealState() {
      return this.getMosaicState === "Reveal";
    },
  },
  async beforeMount() {
    await window.Twitch.ext.onAuthorized((auth) => {
      channelID = auth.channelId;
      this.setChannelID(auth.channelId);
      this.$socket.emit('join room', {
        "channelID": channelID
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-view {
  display: grid;
  align-items: center;
  justify-items: center;
}

.buttons {
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.buttons .left {
  justify-self: start;
}

.buttons .right {
  justify-self: end;
}
</style>
