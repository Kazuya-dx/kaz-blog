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
  const { title, categories, date, imagePath } = frontmatter;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-center">
        <div className="relative w-80 h-80">
          <Image
            alt={title}
            src={imagePath}
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full my-8">
        <h1 className="text-3xl font-black text-center mb-2">{title}</h1>
        <p className="text-center mb-2">{date}</p>
        <div className="flex justify-center">
          {categories.map((category: string) => (
            <div
              key={category}
              className="mx-1 bg-black text-white px-2 py-1 rounded-md cursor-pointer"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <article className="prose prose-h2:text-2xl prose-h2:font-semibold prose-p:text-base prose-p:leading-7 prose-p:mb-20">
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </article>

      <div className="h-80">profile</div>
    </div>
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
