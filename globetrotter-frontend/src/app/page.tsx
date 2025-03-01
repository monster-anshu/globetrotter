import Image from 'next/image';

export default function Home() {
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
          <button
            className="rounded-lg px-4 py-2 text-xl font-medium text-white italic shadow"
            style={{
              background: 'var(--primary-gradient)',
            }}
          >
            Play now
          </button>
        </div>
      </div>
    </main>
  );
}
