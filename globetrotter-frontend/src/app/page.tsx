'use client';
import Button from '@/components/ui/button';
import { UserService } from '@/services/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function Home() {
  const playMutation = useMutation({
    mutationFn: UserService.create,
  });

  return (
    <main>
      <div className="h-dvh">
        <Image
          className="absolute h-full w-full object-cover"
          src={'/static/images/background.webp'}
          alt="Backgorund"
          width={2600}
          height={1600}
        />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2">
          <h1 className="heading text-8xl text-white italic">Globetrotter</h1>
          <h2 className="heading text-2xl text-white">
            Unlock the World's Hidden Wonders
          </h2>
          <Button
            onClick={() => playMutation.mutate({})}
            loading={playMutation.isPending}
          >
            Play now
          </Button>
        </div>
      </div>
    </main>
  );
}
