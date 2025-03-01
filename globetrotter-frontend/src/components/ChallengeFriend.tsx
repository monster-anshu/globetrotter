import { createChallengeURL } from '@/utils/challange';
import { useMutation } from '@tanstack/react-query';
import html2canvas from 'html2canvas';
import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import Button from './ui/button';

type ChallengeFriedProps = {
  username: string;
  score: number;
  userId: string;
};

const ChallengeFried = ({ username, score, userId }: ChallengeFriedProps) => {
  const shareCardRef = useRef<null | HTMLDivElement>(null);

  const downloadImage = useMutation({
    mutationFn: async () => {
      const div = shareCardRef.current;
      if (!div) return;
      const canvas = await html2canvas(div, {
        scale: 3,
        backgroundColor: null,
        logging: false,
      });
      const imageUrl = canvas.toDataURL('image/png');
      return imageUrl;
    },
    onSuccess(data) {
      if (!data) return;
      const a = document.createElement('a');
      a.href = data;
      a.download = 'challange.png';
      document.body.append(a);
      a.click();
      document.removeChild(a);
    },
  });

  const challengeUrl = createChallengeURL(userId);

  const shareToWhatsApp = () => {
    const shareText = `🌍 I scored ${score} points in Globetrotter! Can you beat me? Click here to play: ${challengeUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="grid grid-cols-[300px_1fr] items-start gap-2">
      <div
        ref={shareCardRef}
        className="mb-4 rounded-xl p-5 text-center shadow-2xl"
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
        <p>Think you can beat it?</p>

        {challengeUrl && (
          <div className="mx-auto mt-2 w-fit rounded-lg bg-white p-2">
            <QRCode value={challengeUrl || ''} size={100} />
          </div>
        )}

        <p className="mt-3 font-bold">Scan or tap the link to play!</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={shareToWhatsApp}>Share via WhatsApp</Button>
        <Button onClick={() => downloadImage.mutate()}>Download image</Button>
        <p className="col-span-full mb-1">Or copy this link:</p>
        <div className="col-span-full flex items-center">
          <input
            type="text"
            className="flex-1 pr-2"
            value={challengeUrl}
            readOnly
          />
          <Button
            onClick={() => {
              if (!challengeUrl) return;
              navigator.clipboard.writeText(challengeUrl);
              toast.success('Challenge link copied!');
            }}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFried;
