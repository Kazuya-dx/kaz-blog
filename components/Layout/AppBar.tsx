import Link from 'next/link';
import Router from 'next/router';
import { Button } from '../Elements';

export const AppBar = () => {
  return (
    <div className="sticky top-0 flex justify-center bg-white">
      <div className="flex justify-between items-center max-w-6xl w-full px-8 h-12">
        <h1 className="text-xl font-black">
          <Link href="/">
            <a>KAZB</a>
          </Link>
        </h1>
        <div className="flex">
          <Button
            variant="tertiary"
            className="text-sm font-light"
            onClick={() => Router.push('/blog')}
          >
            Blog
          </Button>
          <Button
            variant="tertiary"
            className="text-sm font-light"
            onClick={() => Router.push('/about')}
          >
            About
          </Button>
        </div>
      </div>
    </div>
  );
};
