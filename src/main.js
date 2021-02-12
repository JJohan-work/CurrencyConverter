import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';


async function checkIfSaved(from,to,currencyObject,storage) {
  const callTime = new Date();

  if (storage[from]) {
    currencyObject.currencyConv[from] = JSON.parse(storage[from]);
    currencyObject.nextUpdateTime = JSON.parse(storage.nextUpdateTime);
  }

  if (currencyObject.nextUpdateTime < callTime && from in currencyObject.currencyConv) {
    console.log("read from memory");
    outputResults(currencyObject.currencyConv[from][to]);
  } else {
    console.log("make new call");
    const response = await Currency.makeAPICall(from);

    storage[from] = JSON.stringify(response["conversion_rates"]);
    currencyObject.currencyConv[from] = response["conversion_rates"];

    storage.nextUpdateTime = JSON.stringify(response["time_next_update_unix"]);
    currencyObject.nextUpdateTime = response["time_next_update_unix"];

    outputResults(currencyObject.currencyConv[from][to]);

  }
  console.log(storage);
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