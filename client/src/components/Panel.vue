<template>
<div class="user-view">
  <MainView />
  <StartView />
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import MainView from "./PanelViews/MainView";
import StartView from "./PanelViews/StartView";

let userID = "";
let channelID = "";
let token = "";
const twitch = window.Twitch.ext;


export default {
  name: 'Panel',
  components: {
    MainView,
    StartView
  },
  data() {
    return {}
  },
  sockets: {
    connect: () => {
      // twitch.rig.log(`Audience: has connected to socket`);
    },
    room_message: (message) => {
      // twitch.rig.log(message);
    },
    Campain_State: (campain) => {
      twitch.rig.log('Viewer campain state has been recieved');
      // do something with a campain state
    }
  },
  methods: {
    ...mapActions(['setMosaicState', 'setDonationGoal', 'setDonationTotal', 'setDonators']),
    printInfo() {
      twitch.rig.log(`Audience: ${userID} is watching Streamer ${channelID}`);
    }
  },
  computed: {
    ...mapGetters(['getMosaicState', 'getDonationGoal', 'getDonators', 'getDonationTotal']),
  },
  async beforeMount() {
    await window.Twitch.ext.onAuthorized((auth) => {
      userID = auth.userId;
      channelID = auth.channelId;
      token = auth.token;
      // put what you want to do with this information in here
      // this.printInfo();
      this.$socket.emit('join room', {
        "channelID": channelID
      })
      this.$socket.emit('request_state', {
        "channelID": channelID
      });

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
