<template>
<div class="user-view">
  <h4>Progress: ${{getDonationTotal}} / ${{ getDonationGoal }}</h4>
  <div class="col-12">
    <b-progress :max="getDonationGoal" height="3rem">
      <b-progress-bar :value="getDonationTotal" variant="success" show-progress animated>
      </b-progress-bar>
    </b-progress>
  </div>
  <h5>Top Donator</h5>
  <b-img class="icon row col-4" center rounded="circle" :src="require('../../assets/gc-icon.png')" alt="GameChanger Charity Icon"></b-img>
  <div class="">
    <!-- donations will go here -->
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

export default {
  name: 'StartView',
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters(['getDonationTotal', 'getDonationGoal'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-view {}

h4,
h5 {
  color: #efefef;
}

p {
  color: #000;
  text-align: center;
}
</style>
