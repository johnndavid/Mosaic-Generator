import Audience from "./Audience";

export default class Stream {
  channelID: string;
  socket: any;
  mosaicState: string;

  constructor(channelID: string, socket: any) {
    this.channelID = channelID;
    this.socket = socket;
    this.mosaicState = 'Start';
  }

  setSocket(socket: any) {
    this.socket = socket;
  }

}
