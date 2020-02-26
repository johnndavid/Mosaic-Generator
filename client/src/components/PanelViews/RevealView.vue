<template>
<div class="user-view">

  <div class="imgReady">
    <b-spinner variant="success" label="Spinning"></b-spinner>
    <h6>Your Mosaic Image is being Generated!</h6>
  </div>
  <div class="imgReady">
    <b-img class="icon row col-8" center :src="this.getIMG" alt="GameChanger Charity Icon"></b-img>
    <h6>Thank you to all who donated!</h6>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

export default {
  name: 'RevealView',
  props: ['channelID'],
  methods: {},
  computed: {
    ...mapGetters(['getChannelID']),
    getIMG() {
      return `http://localhost:3000/imgs/${this.getChannelID}/MosaicImage.jpg`;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-view {
  width: 100%;
}


h4,
h5,
h6 {
  color: #efefef;
}

p {
  color: #000;
  text-align: center;
}
</style>
