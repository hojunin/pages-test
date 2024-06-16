import { DUMMY_IMAGES } from '@/constant/image';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from 'next/image';

export const getServerSideProps = (async (ctx) => {
  const { index } = ctx.query;
  const targetIndex = Number(index);
  if (isNaN(targetIndex)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      src: DUMMY_IMAGES[Number(index)],
    },
  };
}) satisfies GetServerSideProps<{ src: string }>;

export default function ImageDetailPage({
  src,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="w-screen h-screen gap-x-4 bg-blue-300">
      <section className="flex w-full h-auto">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Image
            alt="Mountains"
            src={src}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: 'contain', // cover, contain, none
            }}
          />
        </div>
        <div className="flex-auto bg-green-200">
          <img
            src={src}
            alt="이미지 테스트"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </section>
    </main>
  );
}
