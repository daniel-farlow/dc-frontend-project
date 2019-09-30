// function for fetching data from an api
function get(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}