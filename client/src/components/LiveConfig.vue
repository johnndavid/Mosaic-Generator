<template>
<div class="broadcaster-view container">
  <b-img class="icon col-3" center rounded="circle" :src="require('../assets/gc-icon.png')" alt="GameChanger Charity Icon"></b-img>
  <b-form class="form" @submit="onSubmit">
    <h4>Mosaic Image</h4>
    <b-form-file class="input" v-model="form.file" placeholder="Upload Your Image" drop-placeholder="Drop Your Image Here" accept="image/*" required> </b-form-file>
    <h4>Goal</h4>
    <b-form-input id="range-1" v-model="form.donationGoal" type="range" min="0" max="1000"></b-form-input>
    <b-form-input v-model="form.donationGoal" type="number" placeholder="500"></b-form-input>
    <b-button class="primary-btn" type="submit">{{getMosaicState}}</b-button>
  </b-form>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

let channelID = '';
const twitch = window.Twitch.ext;

export default {
  name: 'LiveConfig',
  data() {
    return {
      form: {
        donationGoal: this.getDonationGoal,
        file: null,
      }
    }
  },
  sockets: {
    connect: () => {
      // twitch.rig.log('Streamer has connected to socket');
    },
    Campain_State: function({
      mosaicState,
      donationTotal,
      donationGoal,
      donators
    }) {
      twitch.rig.log("Streamer has recieved new Campain State");
      this.setMosaicState(mosaicState);
      this.setDonationTotal(donationTotal);
      this.setDonationGoal(donationGoal);
      this.setDonators(donators);
    }
  },
  methods: {
    ...mapActions(['setMosaicState', 'setDonationGoal', 'setDonationTotal', 'setDonators']),
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
    onSubmit(evt) {
      evt.preventDefault();
      this.$socket.emit('change_state', {
        "channelID": channelID
      });
      // upload file to the server
      // this.changeState;
    },
  },
  computed: {
    ...mapGetters(['getMosaicState', 'getDonationGoal']),
  },
  async beforeMount() {
    await twitch.onAuthorized((auth) => {
      channelID = auth.channelId;
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
