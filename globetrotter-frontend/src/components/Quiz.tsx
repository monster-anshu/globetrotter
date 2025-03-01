'use client';
import Button from '@/components/ui/button';
import { QuizQuestion, QuizService } from '@/services/quiz.service';
import { useMutation } from '@tanstack/react-query';
import {} from 'next';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import Confetti from 'react-confetti';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { toast } from 'sonner';

type IQuizProps = {
  quizQuestion: QuizQuestion;
};

const Quiz: FC<IQuizProps> = ({ quizQuestion }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const checkMutation = useMutation({
    mutationFn: QuizService.check,
    onSuccess(data) {
      setShow(data.match);
      if (!data.match) {
        toast.error('🥲 invalid option');
      }
    },
  });

  const handleClick = (answer: string) => {
    checkMutation.mutateAsync({
      alias: quizQuestion.alias,
      answer: answer,
    });
  };

  const handleNext = () => {
    router.refresh();
  };

  return (
    <main className="p-4">
      <h1 className="heading text-2xl italic">Globetrotter</h1>
      {show && <Confetti />}
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
              >
                {option.name}
              </Button>
            );
          })}
        </div>
        <Button
          className="ml-auto flex items-center gap-4 text-3xl"
          variant="secondary"
          onClick={handleNext}
        >
          <span>Next</span>
          <TbPlayerTrackNext />
        </Button>
      </div>
    </main>
  );
};

export default Quiz;
