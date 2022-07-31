import { AppBar } from './AppBar';
import { Footer } from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <AppBar />
      <main className="flex justify-center mb-48">
        <div className="max-w-6xl w-full px-8 bg-white">{children}</div>
      </main>
      <Footer />
    </>
  );
};
