import React, { useEffect, useState } from 'react';

export default function Quiz({ username, selectedCategory, difficulty }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    function decodeHTMLEntities(text) {
        const parser = new DOMParser();
        const dom = parser.parseFromString('<!doctype html><body>' + text, 'text/html');
        return dom.body.textContent;
    }

    // Function to shuffle the array
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`)
            .then(response => response.json())
            .then((data) => {
                setQuestions(data.results)

                const shuffledAnswers = shuffle([...data.results[currentQuestion].incorrect_answers, data.results[currentQuestion].correct_answer]);
                setCorrectAnswer(data.results[currentQuestion].correct_answer)
                setAnswers(shuffledAnswers)
            })
            .catch(error => console.error('Error:', error));
    }, [selectedCategory, difficulty]);

    const handleAnswerOptionClick = (answer) => {
        if (answer === correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setCorrectAnswer(questions[nextQuestion].correct_answer);

            const shuffledAnswers = shuffle([...questions[nextQuestion].incorrect_answers, questions[nextQuestion].correct_answer]);
            setAnswers(shuffledAnswers);
        } else {
            alert(`You scored ${score} out of ${questions.length}`);
        }
    };

    return (
        <div>
            <h1>Quiz</h1>
            <p>Username: {username}</p>
            <p>Selected Category: {selectedCategory}</p>
            <p>Difficulty: {difficulty}</p>
            {questions && questions.length > 0 ? (
                <div key={questions[currentQuestion].question}>
                    <h2>Question {currentQuestion + 1}: </h2>
                    <p>{decodeHTMLEntities(questions[currentQuestion].question)}</p>
                    <div>
                        {answers.map((answer, index) => (
                            <button key={index} onClick={() => handleAnswerOptionClick(answer)}>
                                {decodeHTMLEntities(answer)}
                            </button>
                        ))}
                    </div>
                </div>
            ) : <div>Loading...</div>}
        </div>
    );
}