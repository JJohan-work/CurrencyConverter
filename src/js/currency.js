export default class CurrencyCall {
  constructor() {
    this.currencyConv;
    this.currencyTypes;
    this.nextUpdateTime;
  }

  async makeAPICall(from) {
    try {
      const response  = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${from}`);
      if (!response.ok){
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async checkIfSaved(from) {
    const callTime = new Date();
    if (this.nextUpdateTime < callTime && this.nextUpdateTime) {
      console.log("read from memory");
    } else {
      const response = await this.makeAPICall(from);
      console.log(response);
      this.currencyConv = response["conversion_rates"];
      this.nextUpdateTime = response["time_next_update_unix"];
      console.log(this.currencyConv);
      console.log(this.nextUpdateTime);
      return this.currencyConv[from];
    }
  }

}