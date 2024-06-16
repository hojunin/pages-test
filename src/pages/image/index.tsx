import Loading from '@/components/shared/loading';
import { DUMMY_IMAGES } from '@/constant/image';
import { useIntersectionObserver } from '@/hooks/useIntersection';
import Link from 'next/link';
import React, { forwardRef, useEffect, useState } from 'react';

interface ImageComponentProps {
  src: string;
  index: number;
}

const ImageComponent = ({ src, index }: ImageComponentProps) => {
  const [ref, isIntersecting, entry] = useIntersectionObserver();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isIntersecting) {
      return;
    }
    const img = new Image();
    img.src = src;

    img.onprogress = (e: ProgressEvent) => {
      if (e.lengthComputable) {
        setProgress((e.loaded / e.total) * 100);
      }
    };
    img.onload = () => {
      setLoading(false);
    };
  }, [src, isIntersecting]);

  return (
    <Link href={`/image/${index}`} ref={ref}>
      <img
        className="w-full h-auto rounded-lg"
        src={src}
        alt={src}
        loading={index > 2 ? 'lazy' : 'eager'}
      />
    </Link>
  );
};

const ImageTest = () => {
  const [isGrid, setIsGrid] = useState(false); // 상태 추가

  const toggleLayout = () => {
    setIsGrid((prev) => !prev); // 버튼 클릭 시 상태 토글
  };

  return (
    <div className="flex flex-col gap-y-2 items-center self-center">
      <h1 className="text-3xl">이미지 테스트</h1>

      <button
        onClick={toggleLayout}
        className="mt-2 mb-4 p-2 bg-blue-500 text-white rounded-md"
      >
        {isGrid ? 'Flex로 보기' : 'Grid로 보기'}
      </button>

      <section
        className={`w-96 ${
          isGrid ? 'grid grid-cols-3 gap-4' : 'flex flex-wrap gap-4'
        }`}
      >
        {DUMMY_IMAGES.map((image, index) => (
          <ImageComponent key={image} src={image} index={index} />
        ))}
      </section>
    </div>
  );
};

export default ImageTest;
