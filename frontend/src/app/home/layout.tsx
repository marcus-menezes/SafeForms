import Topbar from "@/components/ui/topbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
