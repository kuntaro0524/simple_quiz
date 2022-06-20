import React from "react";
import { AllQuizProvider } from "./QuizArrayContext";
import { QuizMain } from "./QuizMain";

function App() {
  return (
    <AllQuizProvider>
      <div className="App">
        <header className="App-header">This is my first note.</header>
        <QuizMain />
      </div>
    </AllQuizProvider>
  );
}

export default App;
