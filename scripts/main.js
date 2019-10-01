get('https://opentdb.com/api_category.php')
    .then(data => {
        let categoryNames = data.trivia_categories.map(category => category.name)
        const categorySelections = document.querySelector('#category-selections');
        categoryNames.sort().forEach(category => {
            const categorySelection = document.createElement('option');
            categorySelection.innerText = category;
            categorySelections.append(categorySelection);
        })
    })

function urlConstructor(categoryNum,questionNum) {
    get(`https://opentdb.com/api.php?amount=${questionNum}&category=${categoryNum}`)
        .then(data => {
            addPoints(data.results);
            // data.results.sort((a,b) => a.points - b.points)
            console.log(data.results);
        })
}

urlConstructor(10,8)



function addPoints(questionArray) {
    for (i in questionArray) {
        questionArray[i].difficulty === 'easy' ?  questionArray[i].points = 2
        : questionArray[i].difficulty === 'medium' ? questionArray[i].points = 5
        : questionArray[i].points = 10
    }
}