/*  Brad Balassaitis
    CS 601 Final Project -- Database API Interaction Code

    This code works with a NoSQL database hosted at restdb.io.

    There several functions related to displaying a list of favorite players stored in the database.
    It makes one API call to get a unique list of teams and it builds a drop-down list to use as a filter.
    It makes another call to get the list of players -- either the full list or a filtered list, depending on whether a filter is selected.

    There is a function related to adding a player to the database.

    There is also a function delete a player from the database.
*/



// Set up constants for the api key and the collection url
const restdbio_apikey = '647525a1e3b58f2cb4300c9c';
const restdbio_url = 'https://players-211c.restdb.io/rest/players';


// Reusable function to consistently set up a new XMLHttpRequest object for each call to restdb.io
function setHeaders(xhr) {
    xhr.withCredentials = false;
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-apikey', restdbio_apikey);
    xhr.setRequestHeader('cache-control', 'no-cache');
}


/* Database API
    restdb.io NoSQL database -- function to get a collection of data to display on the page

    Example Respnse:
    [
        {"_id":"64750508a1ce3020000387da","Name":"Joel Embiid","Team":"Philadelphia 76ers","Position":"Center"},
        {"_id":"64750521a1ce3020000387dd","Name":"Brian Dawkins","Team":"Philadelphia Eagles","Position":"Safety"},
        {"_id":"6475053ca1ce3020000387e3","Name":"Chase Utley","Team":"Philadelphia Phillies","Position":"2nd Baseman"}
    ]

    Note: If a team is selected from the drop-down, then add it as a filter:
        https://players-211c.restdb.io/rest/players?q={%22Team%22:%22Philadelphia%20Phillies%22}
*/


// Function to get a list of players. It will either be the full list of players or a filtered list based on a selected team.
const getPlayers = async () => {

    // Check whether a filter is in place
    let teamFilter = localStorage.getItem('teamFilter');
    console.log('Selected Team Filter: ' + teamFilter);

    // Add the filter, if applicable
    let url = restdbio_url;
    if (teamFilter) {
        let filter = {Team: teamFilter};
        url += '?q=' + JSON.stringify(filter);
    }

    const response = await fetch (url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            'x-apikey': restdbio_apikey
        }
    });

    const playerData = await response.json();
    return playerData;
}


// Function to get a list of unique teams for all of the players in the database
const getTeams = async () => {

    let query = {$distinct: "Team"};

    const response = await fetch (restdbio_url + '?q=' + JSON.stringify(query) + '&sort=Team', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache',
            'x-apikey': restdbio_apikey
        }
    });

    const teamData = await response.json();
    return teamData;
}


// Call the functions to look up the player and team data and return a single object with both sets of data
async function getData() {

    // Create an object to return both sets of data
    info = {
        players: await getPlayers().then(data => data),
        teams: await getTeams().then(data => data)
    }
    
    return info;
}


// Call the function to get data to display, then build the display
async function displayPlayers() {
    // Hide the display button
    document.getElementById('btnDisplayPlayers').style.display = "none";

    // Clear the error and data sections
    let dataDiv = document.getElementById('data');
    let errorDiv = document.getElementById('error');
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    console.log('Getting player and team data...');
    let data;
    await getData()
        .then(dt => data = dt);


    console.log('Building display...');
    // console.log({...data});

    // Call the function to build the drop-down list
    let dropdown = buildTeamFilterDropDown(data.teams);

    // Call the function to build player table
    let playerTable = buildPlayerTable(data.players);

    // Display the drop-down and table on the page
    dataDiv.innerHTML = `${dropdown} ${playerTable}`;

    console.log('done');
}


// Build a drop-down filter of teams, if applicable
// Pre-select the last selected option (or the default option otherwise)
function buildTeamFilterDropDown (teams) {
    //console.log('buildTeamFilterDropDown()');
    let selectedTeam = localStorage.getItem('teamFilter');

    let html = '';
    if (teams) {
        html = `<div id="filter">Filter: <select name="TeamFilter" id="TeamFilter" onchange="changeFilter()">
            <option value="" ${(!selectedTeam) ? "selected" : ""}>(All Teams)</option>`;
        for (team of teams) {
            html += `<option value="${team}" ${(selectedTeam === team) ? "selected" : ""}>${team}</option>`;
        }
        html += `</select></div>`;
    }

    return html;
}


// Build a table of player data
// Add a delete button at the end of each row
function buildPlayerTable(players) {
    //console.log('buildPlayerTable()');

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
    return html;
}


// Event handler on the team filter drop-down
// When the filter is changed, store the new value in localStorage and trigger the process to rebuild the display
function changeFilter() {
    // Get the selected filter value and store it in local storage
    let selection = document.getElementById('TeamFilter').value;
    localStorage.setItem('teamFilter', selection);
    console.log('Filter Selection: ' + selection);

    // Trigger the list to be displayed
    displayPlayers();
}



// Read data from the form and add a player to the database
// restdb.io NoSQL database -- function to get a collection of data to display on the page
function addPlayer() {
    let dataDiv = document.getElementById('data');
    let errorDiv = document.getElementById('error');

    // Clear the error and data sections
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    // Event handler to parse the data
    const xhr = new XMLHttpRequest();
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
                displayPlayers();
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
    xhr.open('POST', restdbio_url);
    setHeaders(xhr);
    xhr.send(JSON.stringify(playerData));
}


// Object Constructor for player data to send
function PlayerData (nm, tm, pos) {
    this.Name = nm;
    this.Team = tm;
    this.Position = pos;
}


// Function to delete a player
function deletePlayer(playerId) {
    let dataDiv = document.getElementById('data');
    let errorDiv = document.getElementById('error');

    // Clear the error and data sections
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log('API Response:\n' + this.responseText);

            // Update the list of players
            displayPlayers();
        }
    });

    console.log('Deleting ' + playerId + '...');
    xhr.open('DELETE', restdbio_url + '/' + playerId);
    setHeaders(xhr);
    xhr.send(null);
}






// Original Version of code to display a list of players -- using XHR and without filter capability
/*
function showPlayers() {
    let dataDiv = document.getElementById('data');
    let errorDiv = document.getElementById('error');

    // Clear the error and data sections
    dataDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    // Call the method to make an API call to get the list of teams to use for the drop-down filter
    const filterDropDown = getTeamFilterDropDown();

    

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log('API Response:\n' + this.responseText);

            let players = JSON.parse(this.responseText);

            // Build a table of responses
            let html = `${filterDropDown}
                        <br>
                        <table><thead><tr>
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

    // Either get the full list of players or a filtered list
    
    //*********************************************************************** * /
    // CHANGE THIS TO READ FROM THE DROP-DOWN
    // let teamFilter = 'Philadelphia Phillies';
    let teamFilter = document.getElementById('TeamFilter')?.value;
    console.log('Selected Team Filter: ' + teamFilter);
    debugger;
    //************************************************************************ * /


    if (!teamFilter) {
        console.log('Getting list of players...');
        xhr.open('GET', restdbio_url);
    } else {
        console.log('Getting list of ' + teamFilter + ' players...');
        let filter = {Team: teamFilter};
        console.log('Team filter: ' + JSON.stringify(filter));
        xhr.open('GET', restdbio_url + '?q=' + JSON.stringify(filter));
    }
    setHeaders(xhr);
    xhr.send(null);
}




/*
    Query to get a sorted unique list of teams:
        https://players-211c.restdb.io/rest/players?q={%22$distinct%22:%22Team%22}&sort=Team

    Data:
        [
            "New York Yankees",
            "Philadelphia 76ers",
            "Philadelphia Eagles",
            "Philadelphia Phillies"
        ]


// Query the database for a unique list of team names and build a drop-down with the list of options.
// The drop-down can be used to filter the list of players.
function getTeamFilterDropDown() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log('Team List:\n' + this.responseText);
            let teams = JSON.parse(this.responseText);

            // Build a drop-down filter of teams, if applicable
            let html = '';
            if (teams) {
                html = `<select name="TeamFilter" id="TeamFilter">
                    <option value="" selected>(All Teams)</option>`;
                for (team of teams) {
                    html += `<option value="${team}">${team}</option>`;
                }
                html += `</select>`;
            }

            return html;
        }
    });

    console.log('Getting list of teams...');
    let query = {$distinct: "Team"};
    xhr.open('GET', restdbio_url + '?q=' + JSON.stringify(query) + '&sort=Team');
    setHeaders(xhr);
    xhr.send(null);
}
*/

