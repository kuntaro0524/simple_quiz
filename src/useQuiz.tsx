import { useContext } from "react";
import { AllQuizContext } from "./QuizArrayContext";

export const useQuiz = () => {
  const { qArray, setQarray } = useContext(AllQuizContext);
  return { qArray, setQarray };
};
