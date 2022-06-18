import { AppBar } from './AppBar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <AppBar />
      <main className="flex justify-center bg-slate-100">
        <div className="max-w-6xl w-full px-8 py-8 h-screen bg-white">{children}</div>
      </main>
    </>
  );
};
