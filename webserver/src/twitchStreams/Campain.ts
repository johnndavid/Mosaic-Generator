export default class Campain {
  donators: any[];
  donationTotal: number;
  donationGoal: number;
  mosaicState: string;

  constructor() {
    this.mosaicState = 'Start';
    this.donators = [];
    this.donationTotal = 0;
    this.donationGoal = 500;
  }

  stateChange() {
    if (this.mosaicState === 'Start') {
      this.mosaicState = 'Stop';
    } else if (this.mosaicState === 'Stop') {
      this.mosaicState = 'Reveal';
    } else if (this.mosaicState === 'Reveal') {
      this.mosaicState = 'Reset';
    } else if (this.mosaicState === 'Reset') {
      this.mosaicState = 'Start';
    }
    return this.state();
  }

  state() {
    return { state: this.mosaicState, donationTotal: this.donationTotal, donationGoal: this.donationGoal, }
  }


}
