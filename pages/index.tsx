import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { PostCard } from '../components/Elements/PostCard';

type HomeProps = {
  posts: {
    slug: string;
    frontmatter: {
      [key: string]: any;
    };
  }[];
};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full my-8 pb-8">
        <div className="w-32 h-32 bg-gradient-to-tl from-pink-300 via-purple-300 to-indigo-400 rounded-full mb-4" />
        <p className="text-3xl font-black mb-2">Kaz</p>
        <div className="flex">
          <BsGithub size={24} color="#333" className="mx-1 cursor-pointer" />
          <BsTwitter size={24} color="#333" className="mx-1 cursor-pointer" />
        </div>
      </div>
      <h1 className="text-4xl font-black my-8">最近の投稿</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {posts
          ?.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
          .map((post) => {
            const { slug, frontmatter } = post;
            const { title, categories, date, imagePath, tags } = frontmatter;

            return (
              <PostCard
                key={slug}
                slug={slug}
                title={title}
                imagePath={imagePath}
                categories={categories}
                createdAt={date}
              />
            );
          })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;
