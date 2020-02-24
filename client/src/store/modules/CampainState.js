const state = {
  mosaicState: 'Start',
  donationTotal: 0,
  donationGoal: 500,
  donators: [],
  inputFile: '',
};

const getters = {
  getMosaicState: (state) => state.mosaicState,
  getDonationTotal: (state) => state.donationTotal,
  getDonationGoal: (state) => state.donationGoal,
  getDonators: (state) => state.donators,
  getInputFile: (state) => state.inputFile,
};

const actions = {
  setMosaicState({ commit }, mosaicState) { commit('changeMosaicState', mosaicState); },
  setDonationTotal({ commit }, donationTotal) { commit('changeDonationTotal', donationTotal); },
  setDonationGoal({ commit }, donationGoal) { commit('changeDonationGoal', donationGoal); },
  setDonators({ commit }, donators) { commit('changeDonators', donators); },
  setInputFile({ commit }, inputFile) { commit('changeInputFile', inputFile); },
  setCampainState({ commit }, campainState) {
    commit('setMosaicState', campainState.mosaicState);
    commit('setDonationTotal', campainState.donationTotal);
    commit('setDonationGoal', campainState.donationGoal);
    commit('setDonationTotal', campainState.donationTotal);
  },
};

const mutations = {
  changeMosaicState: (state, mosaicState) => (state.mosaicState = mosaicState),
  changeDonationTotal: (state, donationTotal) => (state.donationTotal = donationTotal),
  changeDonationGoal: (state, donationGoal) => (state.donationGoal = donationGoal),
  changeDonators: (state, donators) => (state.donators = donators),
  changeInputFile: (state, inputFile) => (state.inputFile = inputFile),
};

export default {
  state,
  getters,
  actions,
  mutations
}
