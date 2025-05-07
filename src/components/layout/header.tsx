const Header = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full h-16 flex items-center justify-between px-4 ${className}`}
    >
      <div className="text-2xl font-bold">幼小衔接</div>

      <div className="flex items-center gap-2">
        <button className="text-2xl font-bold"></button>
      </div>
    </div>
  );
};

export default Header;
