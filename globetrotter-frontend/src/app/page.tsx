'use client';
import Button from '@/components/ui/button';
import { UserService } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const playMutation = useMutation({
    mutationFn: UserService.create,
    onSuccess() {
      startTransition(() => {
        router.push('/quiz');
      });
    },
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
          <h1 className="heading text-3xl text-white italic md:text-6xl lg:text-8xl">
            Globetrotter
          </h1>
          <h2 className="heading text-lg whitespace-normal text-white md:text-2xl">
            Unlock the World&apos;s Hidden Wonders
          </h2>
          <Button
            onClick={() => playMutation.mutate({})}
            loading={playMutation.isPending || isPending}
          >
            Play now
          </Button>
        </div>
      </div>
    </main>
  );
}
