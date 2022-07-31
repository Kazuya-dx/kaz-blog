import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import { PostCard } from '../../components/Elements/PostCard';

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
      <h1 className="text-5xl font-black my-8">Blog</h1>

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

export default Blog;
