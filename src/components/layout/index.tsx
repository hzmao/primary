import Header from "./header";
import Footer from "./footer";

// Add type for Header and Footer props if needed
// If Header and Footer do not accept className, remove the prop or update their definitions accordingly

type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={`h-screen flex flex-col ${className}`.trim()}>
      <Header className="shrink-0 w-full text-white bg-blue-700" />
      <div className="flex-1 w-full overflow-y-auto">{children}</div>
      <Footer className="shrink-0 w-full" />
    </div>
  );
};

export default Layout;
