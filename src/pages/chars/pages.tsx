import { pinyin } from "pinyin-pro";
import Page from "../../components/page";
import Char from "../../components/char";

type CharPagesProps = {
  pages: string[][];
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string;
};

const CharPages = ({ ref, pages, className }: CharPagesProps) => {
  return (
    <div ref={ref} className={`print-container ${className}`}>
      {pages.map((pageChars, index) => (
        <Page
          key={`page-${index}`}
          size="A4"
          padding={8}
          className="relative mb-8 print:mb-0"
        >
          <div className="flex flex-wrap gap-2 items-center p-4">
            {pageChars.map((char, charIndex) => (
              <Char
                key={`${index}-${charIndex}-${char}`}
                char={char}
                pinyin={pinyin(char)}
                width={3.9}
                className=""
              />
            ))}
          </div>
          <div className="absolute bottom-5 left-0 right-0 font-[KaiTi] text-center text-gray-500 mt-4">
            第 {index + 1} 页 / 共 {pages.length} 页
          </div>
        </Page>
      ))}
    </div>
  );
};

export default CharPages;
