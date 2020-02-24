<template>
<div class="user-view">
  <div class="main-view container">
    <b-img class="icon row col-6" center rounded="circle" :src="require('../assets/gc-icon.png')" alt="GameChanger Charity Icon"></b-img>
    <b-button class="col-6" center :href="link"> {{learnMore}} </b-button>
  </div>
</div>
</template>

<script>
let userID = "";
let channelID = "";
let token = "";
const twitch = window.Twitch.ext;


export default {
  name: 'MainView',
  data() {
    return {
      learnMore: 'Learn More',
      link: 'https://gamechangercharity.org/',
      state: ''
    }
  },
  methods: {
    printInfo() {
      twitch.rig.log(`userID: ${userID}`);
      twitch.rig.log(`channelID: ${channelID}`);
    }
  },
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
