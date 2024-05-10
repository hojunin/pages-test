import { supabase } from '@/utils/supabase';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { AppInitialProps } from 'next/app';

export const getServerSideProps = (async () => {
  try {
    const { data } = await supabase.from('contents').select('*');

    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        notFound: true,
      };
    }
  }
  return {
    notFound: true,
  };
}) satisfies GetServerSideProps<{ initialData: AppInitialProps }>;

export default function ProductPage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ul className="flex flex-col">
      {initialData?.map((d) => (
        <li>{d.title}</li>
      ))}
    </ul>
  );
}
