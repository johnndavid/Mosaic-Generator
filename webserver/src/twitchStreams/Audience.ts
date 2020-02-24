export default class Audience {
  audienceID: string;
  audienceSocket: any;

  constructor(audienceID: string, audienceSocket: any) {
    this.audienceID = audienceID;
    this.audienceSocket = audienceSocket;
  }


}
