import React, { useEffect, useState } from 'react';

export default function Quiz({ username, selectedCategory, difficulty }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`)
            .then(response => response.json())
            .then(data => setQuestions(data.results))
            .catch(error => console.error('Error:', error));
    }, [selectedCategory, difficulty]); // Only re-run the effect if these values change

    return (
        <div>
            <h1>Quiz</h1>
            <p>Username: {username}</p>
            <p>Selected Category: {selectedCategory}</p>
            <p>Difficulty: {difficulty}</p>
            {questions.map((question, index) => (
                <div key={index}>
                    <h2>Question {index + 1}: </h2>
                    <p>{question.question}</p>
                </div>
            ))}
        </div>
    )
}