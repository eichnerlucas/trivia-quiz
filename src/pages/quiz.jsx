import React, { useEffect, useState } from 'react';
import Logo from "../components/logo";

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

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`)
            .then(response => response.json())
            .then((data) => {
                setQuestions(data.results)
                setCorrectAnswer(data.results[currentQuestion].correct_answer)
                setAnswers(shuffle([...data.results[currentQuestion].incorrect_answers, data.results[currentQuestion].correct_answer]))
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
            setAnswers(shuffle([...questions[nextQuestion].incorrect_answers, questions[nextQuestion].correct_answer]));
        } else {
            alert(`You scored ${score} out of ${questions.length}`);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 rounded-md">
            <Logo />
            {questions && questions.length > 0 ? (
                <div
                    className="flex flex-col items-center bg-gray-800 min-w-96 max-w-96 overflow-auto p-6 mt-4 rounded-md shadow-sm">
                    <h2 className="text-lg text-white font-bold">Question {currentQuestion + 1}:</h2>
                    <p className="mt-2 text-white text-center">{decodeHTMLEntities(questions[currentQuestion].question)}</p>
                    <div className="flex flex-col w-full mt-4">
                        {answers.map((answer, index) => (
                            <button
                                className={`w-full py-2 px-4 bg-amber-400 hover:bg-amber-600 text-white font-semibold rounded-lg mt-2`}
                                key={index} onClick={() => handleAnswerOptionClick(answer)}>
                                {decodeHTMLEntities(answer)}
                            </button>
                        ))}
                    </div>
                </div>
            ) : <div className={"text-white"}>Loading...</div>}
        </div>
    );
}