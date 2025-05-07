const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full h-20 flex items-center justify-center bottom-0 border-t border-t-gray-200 bg-gray-50 ${className}`}
    >
      <CopyRight company="Shink Chu" />
    </div>
  );
};

export default Footer;

const CopyRight = ({ company }: { company?: string }) => {
  return (
    <div className="text-gray-400">
      &copy; {new Date().getFullYear()} {company ?? "Shink Chu"}
    </div>
  );
};
