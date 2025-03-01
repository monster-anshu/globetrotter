import ChallengePage from '@/components/ChallengePage';
import { APP_URL } from '@/env';
import { ChallengeService } from '@/services/challenge.service';
import React, { FC } from 'react';

type IChallengeHandlerProps = {
  params: Promise<Record<string, string>>;
};

export async function generateMetadata({ params }: IChallengeHandlerProps) {
  const { challengeId } = await params;

  const ogImageUrl = new URL(
    `/api/og?challengeId=${challengeId}`,
    APP_URL
  ).toString();

  console.log(ogImageUrl);

  return {
    title: `Globetrotter Challenge #${challengeId}`,
    openGraph: {
      title: `Globetrotter Challenge #${challengeId}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Globetrotter Challenge',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Globetrotter Challenge #${challengeId}`,
      images: [ogImageUrl],
    },
  };
}

const ChallengeHandler: FC<IChallengeHandlerProps> = async (props) => {
  const { challengeId } = await props.params;

  if (!challengeId) {
    throw new Error('challengeId id required');
  }

  const challange = await ChallengeService.get(challengeId);
  const { score, username } = challange;

  return (
    <main className="flex h-dvh items-center justify-center">
      <ChallengePage score={score} username={username} />
    </main>
  );
};

export default ChallengeHandler;
