// function for fetching data from an api
function get(url) {
    return fetch(url)
        .then(response => response.json())
        // .then(data => data);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function addPoints(questionArray) {
    for (i in questionArray) {
        questionArray[i].difficulty === 'easy' ? questionArray[i].points = 2
            : questionArray[i].difficulty === 'medium' ? questionArray[i].points = 5
                : questionArray[i].points = 10
    }
}