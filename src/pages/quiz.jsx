import React, { useEffect, useState } from 'react';
import Logo from "../components/logo";
import GameFinished from "./gameFinished";

export default function Quiz({ username, selectedCategory, difficulty }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState({
        correct: 0,
        incorrect: 0
    });
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [gameFinished, setGameFinished] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    function decodeHTMLEntities(text) {
        const parser = new DOMParser();
        const dom = parser.parseFromString('<!doctype html><body>' + text, 'text/html');
        return dom.body.textContent;
    }

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`);
                if (response.status === 429) {
                    console.log('Rate limit hit - waiting to retry.');
                    setTimeout(fetchData, 5000); // Retry after 2 seconds
                    return;
                }

                const data = await response.json();
                setQuestions(data.results)
                setCorrectAnswer(data.results[currentQuestion].correct_answer);
                setAnswers(shuffle([...data.results[currentQuestion].incorrect_answers, data.results[currentQuestion].correct_answer]));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, difficulty]);

    const handleAnswerOptionClick = (answer) => {
        if (isLocked) return;

        setIsLocked(true);

        setSelectedAnswer(answer);
        checkAnswerCorrectOrWrong(answer);

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setCorrectAnswer(questions[nextQuestion].correct_answer);
                setAnswers(shuffle([...questions[nextQuestion].incorrect_answers, questions[nextQuestion].correct_answer]));
            } else {
                setGameFinished(true);
            }

            setIsLocked(false);
        }, 1000);
    };

    const checkAnswerCorrectOrWrong = (answer) => {
        answer === correctAnswer ? setScore({ ...score, correct: score.correct + 1 }) : setScore({ ...score, incorrect: score.incorrect + 1 })
    }

    return (
        <div className="flex flex-col items-center p-6 rounded-md">
            <Logo />
            {gameFinished ? (
                <GameFinished username={username} score={score} />
            ) : questions && questions.length > 0 ? (
                <div
                    className="flex flex-col items-center bg-gray-800 min-w-96 max-w-96 overflow-auto p-6 mt-4 rounded-md shadow-sm">
                    <h2 className="text-lg text-white font-bold">Question {currentQuestion + 1}:</h2>
                    <p className="mt-2 text-white text-center">{decodeHTMLEntities(questions[currentQuestion].question)}</p>
                    <div className="flex flex-col w-full mt-4">
                        {answers.map((answer, index) => (
                            <button
                                className={`w-full py-2 px-4 font-semibold rounded-lg mt-2 ${answer === selectedAnswer ? (answer === correctAnswer ? 'bg-green-400 hover:bg-green-500' : 'bg-red-400 hover:bg-red-500') : 'bg-amber-400 hover:bg-amber-500'} text-white`}
                                key={index}
                                onClick={() => handleAnswerOptionClick(answer)}
                                onTouchStart={(event) => event.currentTarget.blur()}
                            >
                                {decodeHTMLEntities(answer)}
                            </button>
                        ))}
                    </div>
                </div>
            ) : <div className={"text-white"}>Loading...</div>}
        </div>
    );
}