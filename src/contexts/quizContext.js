import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext(
  {
    selectedCategory: '',
    setSelectedCategory: (username) => {},
    difficulty: '',
    setDifficulty: (difficulty) => {},
  },
);

export default function QuizProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  return (
    <QuizContext.Provider value={{ selectedCategory, setSelectedCategory, difficulty, setDifficulty }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) throw new Error('useQuiz must be used within a QuizProvider');

  const { selectedCategory, setSelectedCategory, difficulty, setDifficulty} = context;
  return { selectedCategory, setSelectedCategory, difficulty, setDifficulty };
}