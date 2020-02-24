export default class Campain {
  channelID: string;
  donators: any[];
  donationTotal: number;
  donationGoal: number;
  mosaicState: string;

  constructor(channelID: string) {
    this.channelID = channelID;
    this.mosaicState = 'Start';
    this.donators = [];
    this.donationTotal = 0;
    this.donationGoal = 0;
  }

  stateChange() {
  }


}
