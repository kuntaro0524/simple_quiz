import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CorrectModal } from "./CorrectModal";
import { qType } from "./types/qType";
import { useQuiz } from "./useQuiz";

export const QuizMain = () => {
  // const server_url = process.env.REACT_APP_SERVER_URL;
  // const server_port = process.env.REACT_APP_SERVER_PORT;
  // const server_url = "10.10.122.179";
  const server_url = "192.168.99.123";
  const server_port = "9201";
  let selquizid = "PPPPPPPP";

  // クイズをDBから取得するとこ
  let tmpArray: qType[];
  const { qArray, setQarray } = useQuiz();

  // ChakraUIのMordalを利用する準備
  let { isOpen, onOpen, onClose } = useDisclosure();

  let [selQid, setSelQid] = useState<string>("test");

  const useDB = () => {
    useEffect(() => {
      axios
        .get<Array<qType>>(`http://${server_url}:${server_port}/english`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          // カテゴリによる選定の場合
          setQarray(res.data);
        })
        .catch(function (error) {
          console.log("ERROR?");
          console.log(error.config);
          console.log(error);
          for (let key of Object.keys(error)) {
            console.log(key);
            console.log(error[key]);
          }
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      // console.log(qArray);
    }, []);
  };

  const onClickMod = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value;
    setSelQid(id);
    onOpen();
  };

  useDB();

  console.log("####################");
  console.log(qArray);
  console.log("####################");

  return (
    <>
      <h1> Quiz Main</h1>

      {qArray.map((each_quiz) => (
        <>
          <Flex color="green" bgColor={"yellow"}>
            <Center width="900px" boxShadow="md" fontSize={18}>
              {each_quiz.answer}
            </Center>
            <Button
              borderRadius={5}
              borderColor="gray.200"
              value={each_quiz._id}
              onClick={onClickMod}
            >
              Modify
            </Button>
          </Flex>
        </>
      ))}
      <CorrectModal isOpen={isOpen} onClose={onClose} selQid={selQid} />
    </>
  );
};
