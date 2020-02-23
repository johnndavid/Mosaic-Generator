<template>
<div class="broadcaster-view container">
  <b-img class="icon col-3" center rounded="circle" :src="require('../assets/gc-icon.png')" alt="GameChanger Charity Icon"></b-img>
  <div class="form">
    <h3>Mosaic Image</h3>
    <b-form-file v-model="file" placeholder="Upload Your Image" drop-placeholder="Drop Your Image Here" accept="image/*"> </b-form-file>
    <h3>Goal</h3>
    <b-form-input id="range-1" v-model="donationGoal" type="range" min="0" max="1000"></b-form-input>
    <b-form-input v-model="donationGoal" type="number"></b-form-input>
  </div>
  <div class="buttons">
    <b-button v-if="btnState === 'Start'" @click="start()">Start</b-button>
    <b-button v-if="btnState === 'Stop'" @click="stop()">Stop</b-button>
    <b-button v-if="btnState === 'Reveal'" @click="reveal()">Reveal</b-button>
    <b-button v-if="btnState === 'Reset'" @click="reset()">Reset</b-button>
  </div>
</div>
</template>

<script>
let userID = "";
let channelID = "";
let token = "";
const twitch = window.Twitch.ext;


export default {
  name: 'Panel',
  data() {
    return {
      donationGoal: 500,
      file: null,
      btnState: 'Start'

    }
  },
  methods: {
    printInfo() {
      twitch.rig.log(`userID: ${userID}`);
      twitch.rig.log(`channelID: ${channelID}`);
      // twitch.rig.log(`token: ${token}`);
    },
    logFile() {
      console.log(this.file);
    },
    start() {
      // function for start button
      console.log("Stop");
      this.btnState = 'Stop';
    },
    stop() {
      // function for stop button
      console.log("Reveal");
      this.btnState = 'Reveal';
    },
    reveal() {
      // function for reveal button
      console.log("Reset");
      this.btnState = 'Reset';
    },
    reset() {
      // function for reset button
      console.log("Start");
      this.btnState = 'Start';
    }

  },
  async beforeMount() {
    console.log("Here I am")
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
.broadcaster-view {
  display: grid;
  grid-template: "icon"auto "form"auto "buttons"auto / 1fr;
  justify-items: center;
}

.icon {
  grid-area: icon;
}

.form {
  grid-area: form;
}

.buttons {
  grid-area: buttons;
}

.buttons {
  background-color: #5ac576;
}
</style>
