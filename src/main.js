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

    if (to in currencyObject.currencyConv[from]) {
      outputResults(currencyObject.currencyConv[from][to],amount,currencyObject);
    } else {
      displayError(`The Currency of ${to} does not exist`);
    }

  } else {
    const response = await Currency.makeAPICall(from);
    if (response.result == "success") {

      if (to in response.conversion_rates) {
        storage[from] = JSON.stringify(response["conversion_rates"]);
        currencyObject.currencyConv[from] = response["conversion_rates"];
        storage.nextUpdateTime = JSON.stringify(response["time_next_update_unix"]);
        currencyObject.nextUpdateTime = response["time_next_update_unix"];
        outputResults(currencyObject.currencyConv[from][to],amount,currencyObject);

      } else {
        displayError(`The Currency of ${to} does not exist`);
      }
    } else {
      displayError(`${response["error-type"]}. The Currency of ${from} may not exist or an error has occured in the API`);
    }
  }
}

function outputResults(output,amount) {
  $("#output").html(parseFloat(output * amount));
}

function displayError(error) {
  $("#error").show();
  $("#eOutput").html(error);
}

function startAnimation() {
  let element = document.getElementById("spinner")
  element.classList.remove("spinnyboi");
  void element.offsetWidth;
  element.classList.add("spinnyboi");
}

function drawCurrentKeys(storage) {
  const keys = JSON.parse(storage.currency);
  console.log(keys);
  let outputstring;
  keys.forEach(key => {
    outputstring += `<option value="${key}">${key}</option>`;
  });
  $("#from").html(outputstring);
  $("#to").html(outputstring);
}

async function getCurrencyKeys(storage) {
  const currency = await Currency.makeAPICall("USD");
  storage.currency = JSON.stringify(Object.keys(currency.conversion_rates));
  drawCurrentKeys(storage);
}


function main() {
  let storage = window.sessionStorage;
  let currencyCall = new Currency;

  if (!storage.currency) {
    getCurrencyKeys(storage);
  } else {
    drawCurrentKeys(storage);
  }


  $("form").on("submit", function(event) {
    event.preventDefault();
    startAnimation();
    convertCurrency($("#from").val(),$("#to").val(),$("#amount").val(),currencyCall,storage);
  });

  $("#acceptError").on("click", function() {
    $("#error").hide();
  });
  
}

main();