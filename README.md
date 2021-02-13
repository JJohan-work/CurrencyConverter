# Currency Converter

#### Convert currencies to currencies. Epicodus project 6

#### By Jonah Johansen

* * *

## Technologies Used

* _HTML_
* _CSS_
* _JavaScript_
* _JQuery_
* _Git_
* _GitHub_
* _Jest_
* _Webpack_
* _npm_
* _[ExchangeRate-API](https://www.exchangerate-api.com/docs/overview)_

* * *

## Description
This Application converts a selected currency to anouther selected currency. It makes an API call to the ExchangeRate-API for information. It contains error handling for currencies that arent contained in the repo and for if the api fails. When a conversion is made the conversion table is saved in session memory and only will make a call again if a new price table is released on the api or the memory is lost. A npm package called [currency-symbol-map](https://github.com/bengourley/currency-symbol-map) is used to convert the currency names from the API to their associated symbols.

* * *

## Setup/Installation Requirements
Clone or Download [this repository](https://github.com/JJohan-work/CurrencyConverter.git)
* Run ```npm install```
An API key is needed for this program to execute, create a file named ```.env``` and paste ```API_KEY={YOUR API KEY}``` where ```{YOUR API KEY}``` is a key made from creating an account at [ExchangeRate-API](https://www.exchangerate-api.com)
* Start Live Server by running ```npm run start``` in the terminal or ```npm run build``` to get dist folder.
If live server does not start after running ```npm run start``` or you are using ```npm run build``` open ```dist/index.html``` to access webpage

* * *

## Known Bugs
* _if bug is found contact at email below_
* * *

## License:
> *&copy; Jonah Johansen, 2021*

* * *

## Addition comments:
* Created on 2/12/21  

* * *

Licensed under [MIT license](https://mit-license.org/)

* * *

## Contact Information
_Jonah Johansen: [Email](johansenjonah+git@gmail.com)