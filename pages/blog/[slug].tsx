import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import Image from 'next/image';
import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';

type BlogProps = {
  frontmatter: {
    [key: string]: any;
  };
  content: string;
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export const Post = ({ frontmatter, content }: BlogProps) => {
  const { title, category, date, bannerImage, tags } = frontmatter;

  return (
    <>
      <Image alt={title} src={bannerImage} height={300} width={400} />
      <h1 className="text-7xl font-black">{title}</h1>
      <h2>{date}</h2>
      <h3>
        {category} || {tags.join()}
      </h3>
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </article>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogProps, Params> = ({ params }) => {
  const fileName = fs.readFileSync(`posts/${params?.slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
};

export default Post;
