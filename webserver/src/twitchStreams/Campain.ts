import MNG from "../mosGen-V2/MNG";
import JimpImage from '../mosGen-V2/jimp-image';
import { DATA } from '../mosGen-V2/report.json';
import fs from "fs";

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
    return this;
  }

  setDonators(donators: any[]) { this.donators = donators };

  getDonationTotal() { return this.donationTotal; };

  setDonationTotal(total: number) { this.donationTotal = total; };

  setDonationGoal(goal: number) { this.donationGoal = goal; };

  getDonationsURLS() {
    return this.donators.map(({ urls }) => urls);
  }

  async saveBaseFile(saveLocation: string, baseFile: any) {
    new JimpImage(await JimpImage.read(baseFile)).save(saveLocation);
  };

  async generateMosaic(channelID: string) {
    this.setDonators(URLS);
    await new MNG(new JimpImage(await JimpImage.read(`${process.cwd()}/imgs/${channelID}/baseFile.jpg`)), this.getDonationsURLS()).generate(`${process.cwd()}/imgs/${channelID}/MosaicImage`);
  }

  hasIMG(channelID: string) {
    return fs.existsSync(`${process.cwd()}/imgs/${channelID}/MosaicImage.jpg`);
  }
}

// const URLS = DATA.donations.slice(0, 10).map(({ profile_image_url }) => {
//   return { "urls": profile_image_url }
// });

const URLS = DATA.donations.map(({ profile_image_url }) => {
  return { "urls": profile_image_url }
});
