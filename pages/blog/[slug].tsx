import Image from 'next/image';
import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';

// TODO: any 削除
// TODO: features にコンポーネントを寄せる
export default function Post({ frontmatter, content }: any) {
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
}

export async function getStaticPaths() {
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
}

// TODO: any 削除
export async function getStaticProps({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}
