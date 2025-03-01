import { ChallengeService } from '@/services/challenge.service';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const challengeId = searchParams.get('challengeId');

  if (!challengeId) {
    return new Response('Missing challenge ID', { status: 400 });
  }

  const challenge = await ChallengeService.get(challengeId);

  if (!challenge) {
    return new Response('Challenge not found', { status: 404 });
  }

  const { score, username } = challenge;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          background: 'linear-gradient(135deg, #2980b9, #6dd5fa)',
        }}
      >
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>
          {'🌍 Globetrotter Challenge'}
        </h2>
        <p style={{ margin: '0.5rem 0', fontSize: '1.125rem' }}>
          <strong style={{ margin: '0 4px' }}>{username}</strong>{' '}
          <span>is challenging you!</span>
        </p>
        <p style={{ margin: '0.75rem 0', fontSize: '1.25rem' }}>
          Current Score: <strong>{score}</strong>
        </p>
        <p style={{ marginBottom: '1.5rem' }}>Think you can beat it?</p>
        <button
          style={{
            background: 'linear-gradient(#97e851, #479440)',
            padding: '10px 20px',
            borderRadius: '8px',
          }}
        >
          Play now
        </button>
      </div>
    ),
    {
      width: 350,
      height: 350,
    }
  );
}
