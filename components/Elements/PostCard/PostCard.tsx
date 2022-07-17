import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineDateRange } from 'react-icons/md';

export type PostCardProps = {
  slug: string;
  title: string;
  imagePath: string;
  categories: string[];
  createdAt: string;
};

export const PostCard = ({ slug, title, imagePath, categories, createdAt }: PostCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="h-64 relative rounded-3xl overflow-hidden transition ease-in-out hover:-translate-y-1 cursor-pointer">
        <div className="w-full h-full relative">
          <Image src={imagePath} alt="test" layout="fill" />
        </div>
        <div className="flex flex-col absolute bottom-0 p-6 bg-black bg-opacity-50 transition ease-in-out hover:bg-opacity-70 w-full h-full">
          <h1 className="text-stone-100 font-black text-xl">{title}</h1>
          <div>
            {categories.map((category) => {
              return (
                <span key={category} className="text-stone-200 text-xs mr-1">
                  {category}
                </span>
              );
            })}
          </div>
          <div className="mt-auto flex items-center">
            <MdOutlineDateRange color="white" size="14" />
            <span className="ml-1 text-stone-200 text-xs">{createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
