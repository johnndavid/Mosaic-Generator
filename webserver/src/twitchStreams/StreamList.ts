import Campain from './Campain';

export default class StreamList {
  streamList: any;

  constructor() {
    this.streamList = {};
  }

  inStreamList(channelID: string): boolean {
    return (!Object.keys(this.streamList).includes(channelID));
  }

  add(channelID: string) {
    if (this.inStreamList(channelID)) {
      this.streamList[channelID] = new Campain(channelID);
    }
  }

  state(channelID: string) {
    if (this.inStreamList(channelID)) {
      return this.streamList[channelID].state();
    }
  }

  changeState(channelID: string) {
    if (this.inStreamList(channelID)) {
      return this.streamList[channelID].changeState();
    }
  }

  delete(channelID: string) {
    delete this.streamList[channelID];
  }
}
