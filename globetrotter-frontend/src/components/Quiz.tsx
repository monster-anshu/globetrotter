'use client';
import Button from '@/components/ui/button';
import { queryClient } from '@/provider/react-query';
import { userInfoQuery } from '@/queries/user.query';
import { QuizQuestion, QuizService } from '@/services/quiz.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useState, useTransition } from 'react';
import { TbPlayerTrackNext } from 'react-icons/tb';
import ChallengeDialog from './ChallengeDialog';
import FailDialog from './FailDialog';
import SuccessDialog from './SuccessDialog';

type IQuizProps = {
  quizQuestion: QuizQuestion;
};

const Quiz: FC<IQuizProps> = ({ quizQuestion }) => {
  const router = useRouter();
  const [inviting, setInviting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [clickedOption, setClickedOption] = useState('');
  const { data: userInfo } = useQuery(userInfoQuery);

  const checkMutation = useMutation({
    mutationFn: QuizService.check,
    onSuccess(data) {
      setClickedOption('');
      queryClient.setQueryData(userInfoQuery.queryKey, (curr) => {
        if (!curr) return;

        return {
          ...curr,
          incorrect: data.isCorrect ? curr.incorrect : curr.incorrect + 1,
          score: data.isCorrect ? curr.score + 1 : curr.score,
        };
      });
    },
  });

  const handleClick = (answer: string) => {
    setClickedOption(answer);
    checkMutation.mutateAsync({
      alias: quizQuestion.alias,
      answer: answer,
    });
  };

  const handleNext = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <main className="p-4">
      {inviting ? <ChallengeDialog onClose={() => setInviting(false)} /> : null}
      <h1 className="heading text-2xl italic">
        <Link href={'/'}>Globetrotter</Link>
      </h1>

      {userInfo && (
        <div className="ml-auto">
          <p>Correct : {userInfo.score}</p>
          <p>Incorrect : {userInfo.incorrect}</p>
        </div>
      )}

      {checkMutation.data?.isCorrect === true && (
        <SuccessDialog
          inviting={inviting}
          handleNext={handleNext}
          funFact={checkMutation.data.funFact}
          answer={checkMutation.data.answer}
          isPending={isPending}
          setInviting={setInviting}
          trivia={checkMutation.data.trivia}
        />
      )}
      {checkMutation.data?.isCorrect === false && (
        <FailDialog
          handleNext={handleNext}
          funFact={checkMutation.data.funFact}
          answer={checkMutation.data.answer}
          isPending={isPending}
          setInviting={setInviting}
          trivia={checkMutation.data.trivia}
        />
      )}

      <div className="mx-auto max-w-5xl">
        <p className="mt-10 text-center text-2xl sm:text-4xl">
          Q. {quizQuestion.clue}
        </p>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-5 sm:w-fit sm:grid-cols-2">
          {quizQuestion.options.map((option) => {
            return (
              <Button
                key={option.id}
                size="lg"
                className="py-3 text-lg md:py-4 md:text-2xl"
                onClick={() => handleClick(option.name)}
                loading={
                  clickedOption === option.name && checkMutation.isPending
                }
              >
                {option.name}
              </Button>
            );
          })}
        </div>
        {!checkMutation.data && (
          <div className="mt-6 flex flex-wrap-reverse items-center gap-2">
            <Button
              onClick={() => setInviting(true)}
              aria-label="Challenge friend"
              className="flex gap-2"
            >
              <UserRoundPlus />
              <span>Challenge friend</span>
            </Button>
            <div className="flex-1"></div>
            <Button
              className="text-lg sm:text-3xl"
              variant="secondary"
              onClick={handleNext}
              loading={isPending}
            >
              <div className="flex items-center gap-2">
                <span>Next</span>
                <TbPlayerTrackNext />
              </div>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Quiz;
