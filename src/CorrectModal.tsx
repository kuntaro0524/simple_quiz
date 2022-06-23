import { ChangeEvent, memo, ReactNode, useEffect, useState, VFC } from "react";

import {
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import { qType } from "./types/qType";
import { useQuiz } from "./useQuiz";

type Props = {
  // クイズ情報を受け取るのだが、これはnullの可能性もある
  isOpen: boolean;
  onClose: () => void;
  selQid: string | null;
};

export const CorrectModal = memo((props: Props) => {
  const { qArray, setQarray } = useQuiz();
  // propsで渡されない場合には disabled と loading は　デフォルト false
  // userを引数として受け取り、それを利用して情報を表示する
  // 配列の中の情報を変更してしまうので受け渡すのはクイズのIDで十分
  const { isOpen, onClose, selQid } = props;

  // クイズの情報を抜き出して表示用に利用する
  const foundindex = qArray.findIndex((quiz) => quiz._id === selQid)!;
  const selQ = qArray[foundindex];

  // 情報を更新するための方法
  const [question, setQuestion] = useState(selQ?.question);
  const [answer, setAnswer] = useState(selQ?.answer);

  // これらは可変なのだが、最初は指定したID番号のquizをいれるべき
  // useEffectは最初のレンダリングのときにだけ呼ばれる
  useEffect(() => {
    setQuestion(selQ?.question);
    setAnswer(selQ?.answer);
  }, [selQ]);

  const onClickUpdate = () => {
    if (selQ !== null) {
      const newquiz = { ...selQ, question: question, answer: answer };
      console.log(newquiz);
      console.log("###### Original array ############");
      console.log(qArray);
      console.log("######################");
      // IDの一致する要素を書き直している
      // set関数を利用して配列をアップデートしなくても反映されているのだが
      // Contextで共有しているはずなんだが他のComponentから見ても問題ないんだろうか？
      qArray.splice(foundindex, 1, newquiz);
      console.log("###### Modified array ############");
      console.log(qArray);
      console.log("######################");
      // Modal window を閉じる
      onClose();
    }
  };

  // 更新する関数：Modalの中のインプットテキストのところに onChange で仕込んでいる関数群
  const onChangeQuiz = (e: ChangeEvent<HTMLInputElement>) =>
    setQuestion(e.target.value);
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) =>
    setAnswer(e.target.value);

  return (
    <div>
      {/* モーダルを追加していく */}
      {/* 自動フォーカスがあたってしまっている（modal の close button) */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        {/* padding bottomの設定 */}
        <ModalContent pb={6}>
          <ModalHeader> 内容の編集 </ModalHeader>
          <ModalCloseButton />
          {/* マージンを調整 */}
          <ModalBody mx={4}>
            {/* 項目を並べるためにStackは入れておこう（配列調整がしやすい） これは */}
            <Stack>
              <FormControl>
                <FormLabel> Question </FormLabel>
                {/* nullの可能性があるよ、と指定してあるのでオプショナルチェイニングが発動している */}
                <Input
                  // useState()で管理している値になった
                  value={question}
                  // 管理者でなければこれはTrueになる
                  isReadOnly={false}
                  // 　useState()で管理している情報を反映
                  onChange={onChangeQuiz}
                />
              </FormControl>
              <FormControl>
                <FormLabel> Answer </FormLabel>
                <Input
                  value={answer}
                  isReadOnly={false}
                  onChange={onChangeAnswer}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button onClick={onClickUpdate}> 内容を修正 </Button>
              <Button background={"red"} onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
});
