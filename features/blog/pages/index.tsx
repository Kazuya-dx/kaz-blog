import Link from 'next/link';

type BlogPageProps = {
  posts: {
    slug: string;
    frontmatter: {
      [key: string]: any;
    };
  }[];
};

export const BlogPage = ({ posts }: BlogPageProps) => {
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
