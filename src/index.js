import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./error-page";
import Start from "./routes/start";
import QuizProvider from "./contexts/quizContext";
import UserProvider from "./contexts/userContext";
import Quiz from "./routes/quiz";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/start",
        element: <Start/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/quiz",
        element: <Quiz/>,
        errorElement: <ErrorPage/>,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <QuizProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
      </QuizProvider>
  </React.StrictMode>
);

reportWebVitals();
