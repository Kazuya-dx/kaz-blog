import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import { BlogPage } from '../../features/blog';

type BlogProps = {
  posts: {
    slug: string;
    frontmatter: {
      [key: string]: any;
    };
  }[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return <BlogPage posts={posts} />;
};

export default Blog;

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
