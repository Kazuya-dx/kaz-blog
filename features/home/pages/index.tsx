import Image from 'next/image';

export const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-600 h-[38rem]">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-8xl font-black text-white mb-4">KAZB</div>
        <div className="text-5xl font-black text-white mb-4">Tech blog created with Next.js</div>
      </div>
    </div>
  );
};
