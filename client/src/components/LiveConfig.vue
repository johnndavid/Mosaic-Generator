<template>
<div class="broadcaster-view container">
  <b-img class="icon col-3" center rounded="circle" :src="require('../assets/gc-icon.png')" alt="GameChanger Charity Icon"></b-img>
  <div class="form">
    <h4>Mosaic Image</h4>
    <b-form-file class="input" v-model="file" placeholder="Upload Your Image" drop-placeholder="Drop Your Image Here" accept="image/*" required="true"> </b-form-file>
    <h4>Goal</h4>
    <b-form-input id="range-1" v-model="donationGoal" type="range" min="0" max="1000"></b-form-input>
    <b-form-input v-model="donationGoal" type="number"></b-form-input>
  </div>
  <div class="buttons">
    <b-button class="primary-btn" v-show="(btnState === 'Start')" @click="messageViewers()">Start</b-button>
    <b-button class="stop" v-show="(btnState === 'Stop')" @click="stop()">Stop</b-button>
    <b-button class="primary-btn" v-show="(btnState === 'Reveal')" @click="reveal()">Reveal</b-button>
    <b-button class="primary-btn" v-show="(btnState === 'Reset')" @click="reset()">Reset</b-button>
  </div>
</div>
</template>

<script>
let userID = '';
let channelID = '';
const twitch = window.Twitch.ext;


export default {
  name: 'Panel',
  data() {
    return {
      donationGoal: 500,
      file: null,
      btnState: 'Start',
    }
  },
  sockets: {
    connect: (resp) => {
      twitch.rig.log('Streamer has connected to socket');
    }
  },
  methods: {
    printInfo() {
      twitch.rig.log(`Streamer: ${channelID} is now streaming with a userID of ${userID}`);
    },
    messageViewers() {
      this.$socket.emit('message_room', {
        "channel": channelID,
        "message": `welcome to channel ${channelID}`
      })
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
    await twitch.onAuthorized((auth) => {
      userID = auth.userId;
      channelID = auth.channelId;
      this.printInfo();
      this.$socket.emit('streamer', {
        'channel': channelID,
      });
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.broadcaster-view {
  display: grid;
  grid-template: "icon"auto "form"auto "buttons"auto / 1fr;
  grid-gap: 5px;
  justify-items: center;
}

.custom-file-input~.custom-file-label::after {
  background-color: #5ac576;
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

.primary-btn {
  background-color: #5ac576;
  border-color: #5ac576;
  color: #000;
}

.stop {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
