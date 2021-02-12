export default class CurrencyCall {
  constructor() {
    this.currencies;
    this.lastUpdateTime;
    this.nextUpdateTime = new Date();
  }

  static async makeAPICall(from, to) {
    try {

    }
    
  }

  checkIfSaved() {
    const callTime = new Date();
    if (this.nextUpdateTime < callTime && this.nextUpdateTime) {
      console.log("read from memory");
    } else {
      console.log("make new call");
    }
  }

}