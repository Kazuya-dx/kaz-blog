import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import { PostCardList } from '../../features/blog/components';

type BlogPageProps = {
  posts: {
    slug: string;
    frontmatter: {
      [key: string]: any;
    };
  }[];
};

export const Blog: NextPage<BlogPageProps> = ({ posts }) => {
  return (
    <>
      <h1 className="text-4xl font-black mt-8 text-transparent bg-clip-text bg-gradient-to-r bg-conic-to-tl from-rose-500 to-indigo-700">
        Posts
      </h1>
      <h2 className="text-gray-600 mb-8">テック・デザイン・ガジェット系の記事一覧を表示します</h2>
      <PostCardList posts={posts} />
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

export default Blog;
