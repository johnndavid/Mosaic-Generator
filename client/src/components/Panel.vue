<template>
<div class="user-view">
  <MainView />
  <StartView />
  <RevealView />
  <!-- <MainView v-if="this.isMainState" />
  <StartView v-else="this.isDonationState" />
  <RevealView v-else="this.isRevealState" /> -->
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
      view: "MainView",
      channelID: ""
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
    }
  },
  methods: {
    ...mapActions(['setMosaicState', 'setDonationGoal', 'setDonationTotal', 'setDonators', 'setChannelID']),
    printInfo() {
      twitch.rig.log(`Audience: ${userID} is watching Streamer ${channelID}`);
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

.main-view {
  display: grid;
  grid-template: "icon"auto "link"2em/ auto;
  align-items: center;
  justify-items: center;
}

.icon {
  grid-area: icon;
  padding: 5vh 0;
}

a {
  grid-area: link;
  background-color: #efefef;
  color: #454343;
  font-size: 1.1em;
  border-radius: 1em;
}

a:hover {
  font-size: 1.2em;
}
</style>
