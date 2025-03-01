'use client';
import Button from '@/components/ui/button';
import { UserService } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

type IChallengePageProps = {
  username: string;
  score: number;
};

const ChallengePage: FC<IChallengePageProps> = ({ score, username }) => {
  const router = useRouter();

  const playMutation = useMutation({
    mutationFn: UserService.create,
    onSuccess() {
      router.push('/quiz');
    },
  });
  return (
    <div
      className="mb-4 max-w-[500px] rounded-xl p-5 text-center shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #2980b9, #6dd5fa)',
      }}
    >
      <h2 className="mb-3 text-2xl">🌍 Globetrotter Challenge</h2>
      <p className="my-2 text-lg">
        <strong>{username}</strong> is challenging you!
      </p>
      <p className="my-3 text-xl">
        Current Score: <strong>{score}</strong>
      </p>
      <p className="mb-6">Think you can beat it?</p>
      <Button
        onClick={() => playMutation.mutate({})}
        loading={playMutation.isPending}
      >
        Play now
      </Button>
    </div>
  );
};

export default ChallengePage;
