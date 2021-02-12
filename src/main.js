import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';

function main() {
  let currencycall = new Currency;

  currencycall.checkIfSaved();
  $("body").html(process.env.API_KEY);
}

main();