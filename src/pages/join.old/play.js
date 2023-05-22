import Head from 'next/head';
import dynamic from 'next/dynamic';


const Play = dynamic(
  () => import('../../components/lance/Play'),
  { ssr: false }
)
export default function Game() {
  return (
    <div>
      <Head>
        <title>Play Dice Game</title>
      </Head>

      <main>
        <Play />
      </main>
    </div>
  );
}
