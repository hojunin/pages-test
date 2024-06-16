import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <Image
      className="animate-spin"
      src="/icon/spinner.svg"
      alt="로딩"
      width={24}
      height={24}
      priority
    />
  );
};

export default Loading;
