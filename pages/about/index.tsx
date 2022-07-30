import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <>
      <h1 className="text-5xl font-black my-8">About</h1>

      <div className="w-32 h-32 bg-gradient-to-tl from-pink-300 via-purple-300 to-indigo-400 rounded-full mb-8" />

      <div>
        <p className="mb-2">Kaz</p>
        <p className="mb-2">
          2021年 - 港区の web 系受託開発企業に新卒として入社後、フロントエンドを担当。
        </p>
        <p className="mb-2">2024年 - フリーランスとして独立。フロント領域。</p>
      </div>
    </>
  );
};

export default About;
