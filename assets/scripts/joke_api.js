/*  Brad Balassaitis
    CS 601 Final Project -- API Interaction Code for the Chuck Norris Joke API

    Note: This was originally implemented with XMLHttpRequest, but it was rewritten to use fetch()
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
    let url = 'https://api.chucknorris.io/jokes/random';

    // Call the API then retrieve the JSON data and display the value property on the page
    console.log('Calling Chuck Norris API with fetch()...');
    fetch (url)
        .then(response => response.json())
        .then(data => document.getElementById('data').innerHTML = data.value || data.status + ' - ' + data.message)
        .catch(err => document.getElementById('data').innerHTML = 'Error hitting Chuck Norris API: ' + err);
}




/*
// Original Version, using XMLHttpRequest. Rewritten to learn to use fetch().
function getChuckNorrisJoke_XMLHttpRequest() {
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
*/