import { stringify } from "querystring";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { qType } from "./types/qType";

export type AllQuizType = {
  qArray: qType[];
  setQarray: Dispatch<SetStateAction<Array<qType>>>;
};

// Type scriptの表現方法として {} を as で受けて型を指定する
export const AllQuizContext = createContext<AllQuizType>({} as AllQuizType);

export const AllQuizProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [qArray, setQarray] = useState<Array<qType>>([
    {
      _id: "IDIKEDIEKD",
      question: "Is this your pen?",
      answer: "Yes, it is.",
      page: 133,
      category: "Textbook",
      made_date: "2022/09/12",
      ntrial: 35,
      ncorr: 20,
      corr_ratio: 23.5,
    },
  ]);
  return (
    <AllQuizContext.Provider value={{ qArray, setQarray }}>
      {children}
    </AllQuizContext.Provider>
  );
};
