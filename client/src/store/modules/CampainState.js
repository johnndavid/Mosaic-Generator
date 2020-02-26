const state = {
  mosaicState: 'Start',
  donationTotal: 250,
  donationGoal: 500,
  donators: [],
  inputFile: null,
  channelID: '',
};

const getters = {
  getMosaicState: (state) => state.mosaicState,
  getDonationTotal: (state) => state.donationTotal,
  getDonationGoal: (state) => state.donationGoal,
  getDonators: (state) => state.donators,
  getInputFile: (state) => state.inputFile,
  getChannelID: (channelID) => state.channelID,
};

const actions = {
  setMosaicState({ commit }, mosaicState) { commit('changeMosaicState', mosaicState); },
  setDonationTotal({ commit }, donationTotal) { commit('changeDonationTotal', donationTotal); },
  setDonationGoal({ commit }, donationGoal) { commit('changeDonationGoal', donationGoal); },
  setDonators({ commit }, donators) { commit('changeDonators', donators); },
  setInputFile({ commit }, inputFile) { commit('changeInputFile', inputFile); },
  setChannelID({ commit }, channelID) { commit('changeChannelID', channelID); },
};

const mutations = {
  changeMosaicState: (state, mosaicState) => (state.mosaicState = mosaicState),
  changeDonationTotal: (state, donationTotal) => (state.donationTotal = donationTotal),
  changeDonationGoal: (state, donationGoal) => (state.donationGoal = donationGoal),
  changeDonators: (state, donators) => (state.donators = donators),
  changeInputFile: (state, inputFile) => (state.inputFile = inputFile),
  changeChannelID: (state, channelID) => (state.channelID = channelID),
};

export default {
  state,
  getters,
  actions,
  mutations
}
