import Campain from './Campain';

export default class StreamList {
  streamList: any;

  constructor() {
    this.streamList = {};
  }

  add(channelID: string) {
    if (!Object.keys(this.streamList).includes(channelID)) {
      this.streamList[channelID] = new Campain(channelID);
    }
  }

  delete(channelID: string) {
    delete this.streamList[channelID];
  }
}
