import Link from 'next/link';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import fs from 'fs';
import matter from 'gray-matter';

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
    <div>
      {posts.map((post) => {
        //extract slug and frontmatter
        const { slug, frontmatter } = post;
        //extract frontmatter properties
        const { title, category, date, bannerImage, tags } = frontmatter;

        //JSX for individual blog listing
        return (
          <article key={title} className="bg-gray-100 p-4">
            <Link href={`/blog/${slug}`}>
              <h1 className="text-xl font-black cursor-pointer">{title}</h1>
            </Link>
            <h3>{category}</h3>
            <h3>{date}</h3>
          </article>
        );
      })}
    </div>
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
