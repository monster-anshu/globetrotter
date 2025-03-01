'use client';
import Button from '@/components/ui/button';
import { QuizQuestion, QuizService } from '@/services/quiz.service';
import { useMutation } from '@tanstack/react-query';
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

  const checkMutation = useMutation({
    mutationFn: QuizService.check,
    onSuccess() {
      setClickedOption('');
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

      {checkMutation.data?.isCorrect === true && (
        <SuccessDialog
          handleNext={handleNext}
          funFact={checkMutation.data.funFact}
          answer={checkMutation.data.answer}
          isPending={isPending}
          setInviting={setInviting}
        />
      )}
      {checkMutation.data?.isCorrect === false && (
        <FailDialog
          handleNext={handleNext}
          funFact={checkMutation.data.funFact}
          answer={checkMutation.data.answer}
          isPending={isPending}
          setInviting={setInviting}
        />
      )}
      <div className="mx-auto max-w-5xl">
        <p className="mt-10 text-center text-4xl">Q. {quizQuestion.clue}</p>
        <div className="mx-auto mt-10 grid w-fit grid-cols-2 gap-5">
          {quizQuestion.options.map((option) => {
            return (
              <Button
                key={option.id}
                size="lg"
                className="py-4 text-2xl"
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
          <div className="mt-6 flex items-center">
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
              className="ml-auto text-3xl"
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
