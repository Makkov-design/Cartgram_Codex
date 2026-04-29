type NavButtonProps = {
  href: string;
  label: string;
};

export function NavButton({ href, label }: NavButtonProps) {
  return (
    <a
      href={href}
      className="group flex h-10 items-center justify-center overflow-hidden whitespace-nowrap rounded-[8px] border border-transparent px-5 transition-all duration-200 ease-out hover:rounded-[12px] hover:border-white/5 hover:bg-white/5"
    >
      <span className="flex h-4 flex-col overflow-hidden whitespace-nowrap text-center text-[16px] font-medium leading-none">
        <span className="text-secondary transition-transform duration-250 ease-out group-hover:-translate-y-4">
          {label}
        </span>
        <span className="text-primary transition-transform duration-250 ease-out group-hover:-translate-y-4">
          {label}
        </span>
      </span>
    </a>
  );
}
