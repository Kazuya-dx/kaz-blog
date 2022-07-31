import Link from 'next/link';

type PostCardProps = {
  title: string;
  slug: string;
  category: string;
  date: string;
};

export const PostCard = ({ title, slug, category, date }: PostCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <article key={title} className="bg-gray-100 p-4 rounded-md h-64 cursor-pointer">
        <h1 className="text-xl font-black cursor-pointer">{title}</h1>
        <h3>{category}</h3>
        <h3>{date}</h3>
      </article>
    </Link>
  );
};
