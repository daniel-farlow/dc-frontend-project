function get(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}


function getQuestions(categoryNum) {
    get(`https://opentdb.com/api.php?amount=10&category=${categoryNum}`)
        .then(data => {
            console.log(data.results);
        })
}
