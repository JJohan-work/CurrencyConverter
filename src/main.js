import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';


async function checkIfSaved(from,to,currencyObject) {
  const callTime = new Date();
  
  // currencyObject = storage.conversionRates;

  if (currencyObject.nextUpdateTime < callTime && from in currencyObject.currencyConv) {
    console.log("read from memory");
    console.log(currencyObject.currencyConv);
    outputResults(currencyObject.currencyConv[from][to]);
  } else {
    console.log("make new call");
    const response = await Currency.makeAPICall(from);

    currencyObject.currencyConv[from] = response["conversion_rates"];
    console.log(currencyObject.currencyConv);
    currencyObject.nextUpdateTime = response["time_next_update_unix"];
    outputResults(currencyObject.currencyConv[from][to]);

  }
}

// function beginAnimation() {}

function outputResults(output) {
  $("#output").html(output);
}

// function displayError(error) {
//   $("#error").text(error);
// }



function main() {
  let storage = window.sessionStorage;
  let currencyCall = new Currency;

  $("#testButton").on("click", function() {
    checkIfSaved($("#from").val(),$("#to").val(),currencyCall,storage);
  });
  
}

main();