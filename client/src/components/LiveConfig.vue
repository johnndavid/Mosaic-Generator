<template>
<div class="broadcaster-view container">
  <b-img class="icon col-3" center rounded="circle" :src="require('../assets/gc-icon.png')" alt="GameChanger Charity Icon"></b-img>
  <div class="form">
    <h4>Mosaic Image</h4>
    <b-form-file class="input" v-model="file" placeholder="Upload Your Image" drop-placeholder="Drop Your Image Here" accept="image/*" :required="true"> </b-form-file>
    <h4>Goal</h4>
    <b-form-input id="range-1" v-model="donationGoal" type="range" min="0" max="1000"></b-form-input>
    <b-form-input v-model="donationGoal" type="number"></b-form-input>
  </div>
  <div class="buttons">
    <b-button class="primary-btn" v-if="isStart" @click="changeState()">Start</b-button>
    <b-button class="stop" v-if="isStop" @click="changeState()">Stop</b-button>
    <b-button class="primary-btn" v-if="isReveal" @click="changeState()">Reveal</b-button>
    <b-button class="primary-btn" v-if="isReset" @click="changeState()">Reset</b-button>
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
      mosaicState: 'Start',
    }
  },
  sockets: {
    connect: () => {
      // twitch.rig.log('Streamer has connected to socket');
    },
    Campain_State: (campain) => {
      twitch.rig.log("Streamer has recieved new Campain State");
      this.mosaicState = campain.mosaicState;
      console.log(this.mosaicState);
    }
  },
  methods: {
    printInfo() {
      // twitch.rig.log(`Streamer: ${channelID} is now streaming with a userID of ${userID}`);
    },
    messageViewers() {
      this.$socket.emit('message_room', {
        "channelID": channelID,
        "message": `welcome to channelID ${channelID}`
      })
    },
    changeState() {
      this.$socket.emit('change_state', {
        'channelID': channelID
      })
    },
  },
  computed: {
    isStart() {
      return this.mosaicState === 'Start';
    },
    isStop() {
      return this.mosaicState === 'Stop';
    },
    isReveal() {
      return this.mosaicState === 'Reveal';
    },
    isReset() {
      return this.mosaicState === 'Reset';
    },
  },
  async beforeMount() {
    await twitch.onAuthorized((auth) => {
      userID = auth.userId;
      channelID = auth.channelId;
      this.printInfo();
      this.$socket.emit('streamer_join', {
        'channelID': channelID,
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
  margin-top: 3px;
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
