import Stream from './Stream';

export default class StreamList {
  streamList: any;

  constructor() {
    this.streamList = {};
  }

  add(channelID: string, channelSocket: any) {
    if (Object.keys(this.streamList).includes(channelID)) {
      if (!(channelSocket === this.streamList[channelID].socket)) {
        this.streamList[channelID].setSocket(channelSocket);
      }
    }
    this.streamList[channelID] = new Stream(channelID, channelSocket);
  }

  delete(channelID: string) {
    delete this.streamList[channelID];
  }
}
