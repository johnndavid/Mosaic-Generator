<template>
<div class="user-view">
  <MainView v-show="state === 'Main'" />
</div>
</template>

<script>
import MainView from "./MainView";

let userID = "";
let channelID = "";
let token = "";
const twitch = window.Twitch.ext;


export default {
  name: 'Panel',
  components: {
    MainView
  },
  data() {
    return {
      learnMore: 'Learn More',
      link: 'https://gamechangercharity.org/',
      state: 'Main'
    }
  },
  sockets: {
    connect: () => {
      twitch.rig.log(`Audience: ${userId} has connected to socket`);
    },
    welcome: (message) => {
      twitch.rig.log('--------------------------------')
      // twitch.rig.log(`Audience: ${userId}`);
      twitch.rig.log(message);
      twitch.rig.log('--------------------------------')
    }

  },
  methods: {
    printInfo() {
      twitch.rig.log(`Audience: ${userID} is watching Streamer ${channelID}`);
    }
  },
  async beforeMount() {
    await window.Twitch.ext.onAuthorized((auth) => {
      userID = auth.userId;
      channelID = auth.channelId;
      token = auth.token;
      // put what you want to do with this information in here
      this.printInfo();
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
