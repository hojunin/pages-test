import { supabase } from '@/utils/supabase';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

type Repo = {
  id: number;
  description: string;
};

export const getStaticProps = (async () => {
  const { data } = await supabase.from('contents').select('*');
  return { props: { data } };
}) satisfies GetStaticProps<{
  data: Repo;
}>;

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ul className="flex flex-col">
      {data?.map((d) => (
        <li key={d.id}>{d.description}</li>
      ))}
    </ul>
  );
}
