import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';


async function convertCurrency(from,to,amount,currencyObject,storage) {
  const callTime = new Date();

  if (storage[from]) {
    currencyObject.currencyConv[from] = JSON.parse(storage[from]);
    currencyObject.nextUpdateTime = JSON.parse(storage.nextUpdateTime);
  }

  if (currencyObject.nextUpdateTime < callTime && from in currencyObject.currencyConv) {
    console.log("read from memory");
    outputResults(currencyObject.currencyConv[from][to],amount);
  } else {
    console.log("make new call");
    const response = await Currency.makeAPICall(from);
    if (response.result == "success") {
      storage[from] = JSON.stringify(response["conversion_rates"]);
      currencyObject.currencyConv[from] = response["conversion_rates"];
      storage.nextUpdateTime = JSON.stringify(response["time_next_update_unix"]);
      currencyObject.nextUpdateTime = response["time_next_update_unix"];
      outputResults(currencyObject.currencyConv[from][to],amount);
    } else {
      displayError(response);
    }
  }
}

// function beginAnimation() {}

function outputResults(output,amount) {
  $("#output").html(parseFloat(output * amount));
}

function displayError(error) {
  $("#error").show();
  $("#error").text(error);
}



function main() {
  let storage = window.sessionStorage;
  let currencyCall = new Currency;

  $("form").on("submit", function(event) {
    event.preventDefault();
    convertCurrency($("#from").val(),$("#to").val(),$("#amount").val(),currencyCall,storage);
  });
  
}

main();