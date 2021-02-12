import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';


async function checkIfSaved(from,currencyObject) {
  const callTime = new Date();
  if (currencyObject.nextUpdateTime < callTime && currencyObject.nextUpdateTime) {
    console.log("read from memory");
  } else {
    const response = await currencyObject.makeAPICall(from);
    console.log(response);
    currencyObject.currencyConv = response["conversion_rates"];
    currencyObject.nextUpdateTime = response["time_next_update_unix"];
    outputResults(currencyObject.currencyConv[from]);
  }
}

// function beginAnimation() {}

function outputResults(output) {
  $("body").html(output)
}



function main() {
  let currencyCall = new Currency;

  checkIfSaved("USD",currencyCall);
  
}

main();