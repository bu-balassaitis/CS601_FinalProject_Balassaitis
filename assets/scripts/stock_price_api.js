/*  Brad Balassaitis
    CS 601 Final Project -- API Interaction Code for the Stock Price API
*/


/* Stock Price API
    URL Parameter is a stock symbol or comma-separated list of symbols. (Spaces are fine.)

    Example Respnse:
    [
        {"symbol":"MSFT","price":332.89,"volume":35719560},
        {"symbol":"PLTR","price":13.65,"volume":125390347},
        {"symbol":"PG","price":145.4,"volume":4694384},
        {"symbol":"TSLA","price":193.17,"volume":160467296}
    ]
*/

// Call the stock price API to get the price of one or more provided stock symbols and display the results in a table
function getStockPrices() {
    let dataDiv = document.getElementById('data');
    let errorDiv = document.getElementById('error');

    // Clear the error and data sections
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log('API Response:\n' + this.responseText);

            if (this.responseText.startsWith('No data found')) {
                errorDiv.innerHTML = 'No data found for ' + symbols + '. Please check the symbol(s) and re-try';
                return;
            }
            let parsedResponse = JSON.parse(this.responseText);

            // Build a table of responses
            let html = "<table><thead><tr><th>Symbol</th><th>Price</th><th>Volume</th>";
            for (const stock of parsedResponse) {
                html += "<tr><td>" + stock.symbol + "</td><td>" + stock.price + "</td><td>" + stock.volume + "</td></tr>";
            }

            html += "</table>";

            dataDiv.innerHTML = html;
        }
    });

    // Build and send the XHR request to the API
    // let symbols = 'IBM, AAPL,PG, TSLA';
    let symbols = document.getElementById('StockSymbols').value;

    if (symbols.trim() === '') {
        errorDiv.innerHTML = 'Please enter one or more stock symbols';
        return;
    }

    xhr.open('GET', 'https://real-time-quotes1.p.rapidapi.com/api/v1/realtime/stock?symbols=' + encodeURIComponent(symbols));
    xhr.setRequestHeader('X-RapidAPI-Key', '10ff111dc8msh2dbe6890f5d9a48p106569jsn1bbab4740039');
    xhr.setRequestHeader('X-RapidAPI-Host', 'real-time-quotes1.p.rapidapi.com');
    xhr.send(null);
}
