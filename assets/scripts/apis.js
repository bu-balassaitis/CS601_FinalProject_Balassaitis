/*  Brad Balassaitis
    CS 601 Final Project -- API Interaction Code
*/


/* Chuck Norris API

    Example Respnse:
    {
        "categories":[],
        "created_at":"2020-01-05 13:42:21.795084",
        "icon_url":"https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        "id":"Pm-efhMvRNue_FJ4N25KUw","updated_at":"2020-01-05 13:42:21.795084",
        "url":"https://api.chucknorris.io/jokes/Pm-efhMvRNue_FJ4N25KUw",
        "value":"Chuck Norris teaches new tricks to old dogs and has made a leopard change it's spots."
    }
*/


function getChuckNorrisJoke() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('API Response:\n' + xhr.responseText);
            let parsedResponse = JSON.parse(xhr.responseText);
            document.getElementById('data').innerHTML = parsedResponse.value;
        }
    }
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);
    xhr.send(null);
}


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
            for (stock of parsedResponse) {
                html += "<tr><td>" + stock.symbol + "</td><td>" + stock.price + "</td><td>" + stock.volume + "</td></tr>";
            }

            html += "</table>";

            dataDiv.innerHTML = html;
        }
    });

    // Build and send the XHR request to the API
    // let symbols = 'IBM, AAPL,PG, TSLA';
    let symbols = document.getElementById('StockSymbols').value;

    if (symbols.trim() == '') {
        errorDiv.innerHTML = 'Please enter one or more stock symbols';
        return;
    }

    xhr.open('GET', 'https://real-time-quotes1.p.rapidapi.com/api/v1/realtime/stock?symbols=' + encodeURIComponent(symbols));
    xhr.setRequestHeader('X-RapidAPI-Key', '10ff111dc8msh2dbe6890f5d9a48p106569jsn1bbab4740039');
    xhr.setRequestHeader('X-RapidAPI-Host', 'real-time-quotes1.p.rapidapi.com');
    xhr.send(null);
}



/* Database API
    restdb.io NoSQL database -- function to get a collection of data to display on the page

    Example Respnse:
    [
        {"_id":"64750508a1ce3020000387da","Name":"Joel Embiid","Team":"Philadelphia 76ers","Position":"Center"},
        {"_id":"64750521a1ce3020000387dd","Name":"Brian Dawkins","Team":"Philadelphia Eagles","Position":"Safety"},
        {"_id":"6475053ca1ce3020000387e3","Name":"Chase Utley","Team":"Philadelphia Phillies","Position":"2nd Baseman"}
    ]
*/

const restdbio_apikey = '647525a1e3b58f2cb4300c9c';

function showPlayers() {
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

            let players = JSON.parse(this.responseText);

            // Build a table of responses
            let html = `<table><thead><tr>
                            <th>Player</th><th>Team</th><th>Position</th><th></th>
                        </tr></thead>`;
            for (player of players) {
                let deleteBtn = `<input type="button" class="deleteBtn" value="X" onclick="deletePlayer('${player._id}')">`;
                html += `<tr>
                        <td>${player.Name}</td>
                        <td>${player.Team}</td>
                        <td>${player.Position}</td>
                        <td>${deleteBtn}</td>
                        </tr>`;
            }
            html += `</table>`;
            dataDiv.innerHTML = html;
        }
    });

    console.log('Getting list of players...');
    xhr.open('GET', 'https://players-211c.restdb.io/rest/players');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-apikey', restdbio_apikey);
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.send(null);
}


// Read data from the form and add a player to the database
// restdb.io NoSQL database -- function to get a collection of data to display on the page
function addPlayer() {
    let dataDiv = document.getElementById('data');
    let errorDiv = document.getElementById('error');

    // Clear the error and data sections
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    // Event handler to parse the data
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log('API Response:\n' + this.responseText);

            if (this.status >= 400) {
                // Unsuccessful -- Display error message
                let responseJson = JSON.parse(this.responseText);

                let errorMsg = `${responseJson.message}<BR>`;
                for (msg of responseJson.list) {
                    errorMsg += `<BR>${msg.field}: ${msg.message}`;
                }

                document.querySelector('#error').innerHTML = errorMsg;

            } else {
                // Successful -- get the updated list of players
                showPlayers();
            }

            
        }
    });


    // Build the data object to send
    frm = document.forms.addPlayer;

    const playerData = new PlayerData(frm.name.value, frm.team.value, frm.position.value);
    //const playerData = new PlayerData('TestName2', 'TestTeam2', 'TestPosition2');

    // Send the request
    console.log('Adding player...');
    console.log(JSON.stringify(playerData));
    xhr.open('POST', 'https://players-211c.restdb.io/rest/players');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-apikey', restdbio_apikey);
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.send(JSON.stringify(playerData));
}


// Object Constructor for player data to send
function PlayerData (nm, tm, pos) {
    this.Name = nm;
    this.Team = tm;
    this.Position = pos;
}


function deletePlayer(playerId) {
    let dataDiv = document.getElementById('data');
    let errorDiv = document.getElementById('error');

    // Clear the error and data sections
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';


    // Clear the error and data sections
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;


    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log('API Response:\n' + this.responseText);

            // Update the list of players
            showPlayers();
        }
    });

    

    console.log('Deleting ' + playerId + '...');
    //xhr.open('DELETE', 'https://players-211c.restdb.io/rest/players/*?q={"Name": "' + playerName + '}"}');
    xhr.open('DELETE', 'https://players-211c.restdb.io/rest/players/' + playerId);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-apikey', restdbio_apikey);
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.send(null);
}
