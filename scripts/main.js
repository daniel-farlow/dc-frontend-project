'use strict';

/* Sample JSON response */
const sampleResponse = {
    "response_code": 0,
    "results": [
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Which of these teams isn&#039;t a member of the NHL&#039;s &quot;Original Six&quot; era?",
            "correct_answer": "Philadelphia Flyers",
            "incorrect_answers": [
                "New York Rangers",
                "Toronto Maple Leafs",
                "Boston Bruins"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "medium",
            "question": "In a game of snooker, what colour ball is worth 3 points?",
            "correct_answer": "Green",
            "incorrect_answers": [
                "Yellow",
                "Brown",
                "Blue"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Who won the 2015 Formula 1 World Championship?",
            "correct_answer": "Lewis Hamilton",
            "incorrect_answers": [
                "Nico Rosberg",
                "Sebastian Vettel",
                "Jenson Button"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Josh Mansour is part of what NRL team?",
            "correct_answer": "Penrith Panthers",
            "incorrect_answers": [
                "Melbourne Storm",
                "Sydney Roosters",
                "North Queensland Cowboys"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "hard",
            "question": "Which male player won the gold medal of table tennis singles in 2016 Olympics Games?",
            "correct_answer": "Ma Long (China)",
            "incorrect_answers": [
                "Zhang Jike (China)",
                "Jun Mizutani (Japan)",
                "Vladimir Samsonov (Belarus)"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "medium",
            "question": "Which soccer team won the Copa Am&eacute;rica 2015 Championship ?",
            "correct_answer": "Chile",
            "incorrect_answers": [
                "Argentina",
                "Brazil",
                "Paraguay"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In Baseball, how many times does the ball have to be pitched outside of the strike zone before the batter is walked?",
            "correct_answer": "4",
            "incorrect_answers": [
                "1",
                "2",
                "3"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "medium",
            "question": "In 2016, who won the Formula 1 World Constructor&#039;s Championship for the third time in a row?",
            "correct_answer": "Mercedes-AMG Petronas",
            "incorrect_answers": [
                "Scuderia Ferrari",
                "McLaren Honda",
                "Red Bull Racing Renault"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What is the oldest team in Major League Baseball?",
            "correct_answer": "Atlanta Braves",
            "incorrect_answers": [
                "Chicago Cubs",
                "Cincinnati Reds",
                "St. Louis Cardinals"
            ]
        },
        {
            "category": "Sports",
            "type": "multiple",
            "difficulty": "hard",
            "question": "Which year was the third Super Bowl held?",
            "correct_answer": "1969",
            "incorrect_answers": [
                "1968",
                "1971",
                "1970"
            ]
        }
    ]
}

//GRAB QUESTION Sports Question
const sports = document.getElementById('qtext').innerHTML = sampleResponse.results[0].question;
const ch_1 = document.getElementById('ch_1').innerHTML = "A) " + sampleResponse.results[0].correct_answer;
const ch_2 = document.getElementById('ch_2').innerHTML = "B) " + sampleResponse.results[0].incorrect_answers[0];
const ch_3 = document.getElementById('ch_3').innerHTML = "C) " + sampleResponse.results[0].incorrect_answers[1];
const ch_4 = document.getElementById('ch_4').innerHTML = "D) " + sampleResponse.results[0].incorrect_answers[2];