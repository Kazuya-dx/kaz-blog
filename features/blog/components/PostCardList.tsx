import { PostCard } from './PostCard';

type PostCardListProps = {
  posts: {
    slug: string;
    frontmatter: {
      [key: string]: any;
    };
  }[];
};

export const PostCardList = ({ posts }: PostCardListProps) => {
  return (
    <div className="grid gap-4 grid-cols-4">
      {posts.map((post) => {
        const { slug, frontmatter } = post;
        const { title, category, date, bannerImage, tags } = frontmatter;

        return <PostCard key={title} title={title} slug={slug} category={category} date={date} />;
      })}
    </div>
  );
};
