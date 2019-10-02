const questionsForm = document.querySelector('#questionsForm');
questionsForm.addEventListener('submit', event => {
    event.preventDefault();
    // get selected category id value
    const categoryOptions = questionsForm.querySelector('#categoryOptions');
    const categoryValue = categoryOptions.value;
    // get desired number of questions
    const questionNumOptions = questionsForm.querySelector('#questionNumOptions');
    const questionNumValue = questionNumOptions.value;
    // fetch data based on above values 
    urlConstructor(questionNumValue, categoryValue)
})


function generateCategoryOptions() {
    get('https://opentdb.com/api_category.php')
        .then(data => {
            // strip category names of "Entertainment: " and "Science: " 
            let categoryNames = data.trivia_categories.map(category => {
                return category.name.includes('Entertainment: ') ? category.name.substring('Entertainment: '.length)
                    : category.name.includes('Science: ') ? category.name.substring('Science: '.length)
                        : category.name;
            });

            // create object with category names as properties and their category ids as values
            let categoryIdLookup = {};
            for (i in data.trivia_categories) {
                categoryIdLookup[categoryNames[i]] = data.trivia_categories[i].id;
            }

            // sort categoryNames array
            // then create property of Random in categoryIdLookup and give it the value of an empty string
            categoryNames.sort().unshift('Surprise Me!');
            categoryIdLookup['Surprise Me!'] = '';

            // create dropdown list of categories options and set their values using categoryIdLookup
            const categoryOptions = document.querySelector('#categoryOptions');
            categoryNames.forEach(categoryName => {
                const categoryOption = document.createElement('option');
                categoryOption.innerText = categoryName;
                categoryOption.value = categoryIdLookup[categoryName]
                categoryOptions.append(categoryOption);
            })
        })
}

function urlConstructor(questionNum, categoryNum) {
    // fetch data based on user-selected category and desired number of questions
    get(`https://opentdb.com/api.php?amount=${questionNum}&category=${categoryNum}`)
        .then(data => {
            // add points to each question object based on difficulty level
            addPoints(data.results);
            // grab question container to append questions to
            const questionContainer = document.querySelector('.question-container');
            // empty out question container each time form is submitted
            while (questionContainer.firstChild) {
                questionContainer.removeChild(questionContainer.firstChild);
            }
            shuffleArray(data.results).forEach(result => {
                let questionWrapper = document.createElement('div');
                questionWrapper.classList.add('question-wrapper')
                let triviaQuestion = document.createElement('p');
                triviaQuestion.innerHTML = result.question;
                triviaQuestion.innerHTML += `<br>(Difficulty: ${result.difficulty}; points: ${result.points})`
                let possibleAnswers = [result.correct_answer, ...result.incorrect_answers];
                shuffleArray(possibleAnswers);
                let triviaAnswers = document.createElement('ol');
                possibleAnswers.forEach(answer => {
                    let answerItem = document.createElement('li');
                    answerItem.classList.add('answer-choices')
                    answerItem.innerHTML = answer;
                    triviaAnswers.append(answerItem);
                })
                questionWrapper.append(triviaQuestion, triviaAnswers);
                questionContainer.append(questionWrapper)
            })

        })
}

generateCategoryOptions()

