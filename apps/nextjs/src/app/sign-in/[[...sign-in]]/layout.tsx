function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center py-2 md:-mt-40">
      {children}
    </div>
  );
}

export default Layout;
