export default class CurrencyCall {
  constructor() {
    this.currencyConv = {};
    this.currencyTypes;
    this.nextUpdateTime;
  }

  static async makeAPICall(from) {
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

}