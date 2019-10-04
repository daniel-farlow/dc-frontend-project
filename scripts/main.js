const questionsForm = document.querySelector('#questionsForm');
const scoreHeader = document.createElement('h1');
let scoreTracker = 0;
scoreHeader.innerHTML = `Current score: ${scoreTracker}`
questionsForm.append(scoreHeader);

questionsForm.addEventListener('submit', event => {
    event.preventDefault();
    // get selected category id value
    const categoryOptions = questionsForm.querySelector('#categoryOptions');
    const categoryValue = categoryOptions.value;
    // get desired number of questions
    const questionNumOptions = questionsForm.querySelector('#questionNumOptions');
    const questionNumValue = questionNumOptions.value;
    // fetch data based on above values 
    constructURL(questionNumValue, categoryValue)
})


function generateCategoryOptions() {
    get('https://opentdb.com/api_category.php')
        .then(data => {
            // make array of all category names
            let categoryNames = data.trivia_categories.map(result => result.name);
            // sanitize the category names (i.e., remove the 'Entertainment: ' and 'Science: ' prepending text)
            let sanitizedCategoryNames = sanitizeCategoryNames(categoryNames);
            // make array of all category ids
            let categoryIds = data.trivia_categories.map(result => result.id);

            // make object with sanitized category names as properties and name ids as values
            let categoriesWithIds = {}
            categoriesWithIds['Surprise Me!'] = '';
            sanitizedCategoryNames.forEach((categoryName, i) => categoriesWithIds[categoryName] = categoryIds[i]);
            sanitizedCategoryNames.sort().unshift('Surprise Me!');

            // create the selection list of categories
            createCategoryMenu(sanitizedCategoryNames, categoriesWithIds);
        })
}

function createCategoryMenu(categoryNames, catLookup) {
    const categoryOptions = document.querySelector('#categoryOptions');
    categoryNames.forEach(categoryName => {
        const categoryOption = document.createElement('option');
        categoryOption.innerText = categoryName;
        categoryOption.value = catLookup[categoryName]
        categoryOptions.append(categoryOption);
    })
}

function sanitizeCategoryNames(categoryNamesArray) {
    const sanitizedCategoryNames = categoryNamesArray.map(categoryName => {
        return categoryName.includes('Entertainment: ') ? categoryName.substring('Entertainment: '.length)
            : categoryName.includes('Science: ') ? categoryName.substring('Science: '.length)
                : categoryName;
    });
    return sanitizedCategoryNames;
}

/*
FUNCTION BELOW NEEDS ADDITIONAL REFACTORING (waiting to determine how game play should really work)
*/

function constructURL(questionNum, categoryNum) {
    // fetch data based on user-selected category and desired number of questions
    scoreTracker = 0;
    scoreHeader.innerHTML = `Current score: ${scoreTracker}`
    get(`https://opentdb.com/api.php?amount=${questionNum}&category=${categoryNum}`)
        .then(data => {
            // grab question container to append questions to
            const questionContainer = document.querySelector('.question-container');
            // empty out question container each time form is submitted
            while (questionContainer.firstChild) {
                questionContainer.removeChild(questionContainer.firstChild);
            }
            // store fetched questions as objects in an array (each question is an object)
            let questionArray = data.results;
            // randomize the array of question objects
            let randomizedQuestions = shuffleArray(questionArray);
            // add points to each question object based on difficulty level
            addPoints(questionArray);
            /* IMPORTANT!!!
            - The code below is executed on each question returned from the API pull
            - Right now questions are removed by giving each one a unique id and then removing the node with that id one an answer is selected
            - Possible things to consider implementing:
                + Have each question display by itself and wait for a click before going on to the next question
                + Change the way questions are removed (disallow click events after one click occurs)
            */
            for (let i = 0; i < randomizedQuestions.length; i++) {
                let questionWrapper = document.createElement('div');
                questionWrapper.classList.add('question-wrapper')
                let triviaQuestion = document.createElement('p');
                questionWrapper.setAttribute('id', `question${i}`);
                triviaQuestion.innerHTML = randomizedQuestions[i].question;
                triviaQuestion.innerHTML += `<br>(Difficulty: ${randomizedQuestions[i].difficulty}; points: ${randomizedQuestions[i].points})`
                let possibleAnswers = [randomizedQuestions[i].correct_answer, ...randomizedQuestions[i].incorrect_answers];
                let answerLookup = {};
                answerLookup[possibleAnswers[0]] = 'correct';
                for (let i = 1; i < possibleAnswers.length; i++) {
                    answerLookup[possibleAnswers[i]] = 'incorrect';
                }
                shuffleArray(possibleAnswers);
                let triviaAnswers = document.createElement('ol');
                possibleAnswers.forEach(answer => {
                    let answerItem = document.createElement('li');
                    answerItem.classList.add('answer-choices')
                    answerItem.innerHTML = answer;
                    answerItem.addEventListener('click', () => {
                        if (answerLookup[answerItem.innerHTML] === 'correct') {
                            scoreTracker += randomizedQuestions[i].points;
                            scoreHeader.innerHTML = `Current score: ${scoreTracker}`
                            // VERY HACKY WAY TO REMOVE THE QUESTION WHOSE ANSWER IS CLICKED ON
                            answerItem.style.color = 'green';
                            setTimeout( () => {
                                const questionToRemove = document.querySelector(`#question${i}`);
                                questionToRemove.parentNode.removeChild(questionToRemove);
                            }, 1000)
                        } else {
                            scoreTracker -= 1;
                            scoreHeader.innerHTML = `Current score: ${scoreTracker}`
                            // VERY HACKY WAY TO REMOVE THE QUESTION WHOSE ANSWER IS CLICKED ON
                            answerItem.style.color = 'red';
                            setTimeout( () => {
                                const questionToRemove = document.querySelector(`#question${i}`);
                                questionToRemove.parentNode.removeChild(questionToRemove);
                            }, 1000)
                        }
                    })
                    triviaAnswers.append(answerItem);
                })
                questionWrapper.append(triviaQuestion, triviaAnswers);
                questionContainer.append(questionWrapper)
            }
        })
}

generateCategoryOptions()