const state = {
  mosaicState: 'Start',
  donationTotal: 250,
  donationGoal: 500,
  donators: [],
  inputFile: null,
  channelID: '',
  hasIMG: false,
};

const getters = {
  getMosaicState: (state) => state.mosaicState,
  getDonationTotal: (state) => state.donationTotal,
  getDonationGoal: (state) => state.donationGoal,
  getDonators: (state) => state.donators,
  getInputFile: (state) => state.inputFile,
  getChannelID: (state) => state.channelID,
  getHasIMG: (state) => state.hasIMG,
};

const actions = {
  setMosaicState({ commit }, mosaicState) { commit('changeMosaicState', mosaicState); },
  setDonationTotal({ commit }, donationTotal) { commit('changeDonationTotal', donationTotal); },
  setDonationGoal({ commit }, donationGoal) { commit('changeDonationGoal', donationGoal); },
  setDonators({ commit }, donators) { commit('changeDonators', donators); },
  setInputFile({ commit }, inputFile) { commit('changeInputFile', inputFile); },
  setChannelID({ commit }, channelID) { commit('changeChannelID', channelID); },
  setHasIMG({ commit }, hasIMG) { commit('changeHasIMG', hasIMG); },
};

const mutations = {
  changeMosaicState: (state, mosaicState) => (state.mosaicState = mosaicState),
  changeDonationTotal: (state, donationTotal) => (state.donationTotal = donationTotal),
  changeDonationGoal: (state, donationGoal) => (state.donationGoal = donationGoal),
  changeDonators: (state, donators) => (state.donators = donators),
  changeInputFile: (state, inputFile) => (state.inputFile = inputFile),
  changeChannelID: (state, channelID) => (state.channelID = channelID),
  changeHasIMG: (state, hasIMG) => (state.hasIMG = hasIMG),
};

export default {
  state,
  getters,
  actions,
  mutations
}
