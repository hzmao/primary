import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import Layout from "../../components/layout";
import CharPages from "./pages";
import Settings, { SettingsType } from "./settings";

import { THU_CHARS_6763 } from "../../utils/constants";

const CHARS_PER_PAGE = 100;

const CharsPage = () => {
  const [pages, setPages] = useState<string[][]>([]);
  const [settings, setSettings] = useState<SettingsType>({
    allChars: THU_CHARS_6763.split(""),
    filteredChars: [],
    from: 0,
    to: 1000,
    colors: { pinyin: "#000000", char: "#000000" },
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const chars = settings.allChars
      .filter((char) => char !== " " && !settings.filteredChars.includes(char))
      .slice(settings.from, settings.to);
    const totalPages = Math.ceil(chars.length / CHARS_PER_PAGE);
    const pagesArray: string[][] = [];

    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * CHARS_PER_PAGE;
      const endIndex = Math.min(startIndex + CHARS_PER_PAGE, chars.length);
      pagesArray.push(chars.slice(startIndex, endIndex));
    }

    setPages(pagesArray);
  }, [settings.allChars, settings.filteredChars, settings.from, settings.to]);

  return (
    <Layout>
      <div className="h-full flex flex-row overflow-hidden">
        <div className="h-full p-4 bg-gray-50 overflow-y-auto border-r border-gray-200">
          <Settings settings={settings} onSetting={setSettings} />

          <div className="w-full flex justify-center mt-4">
            <button
              onClick={() => reactToPrintFn()}
              className="w-32 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              打印全部页面
            </button>
          </div>
        </div>

        <div className="h-full flex-1 p-4 overflow-y-auto">
          <CharPages ref={contentRef} pages={pages} />
        </div>
      </div>
    </Layout>
  );
};

export default CharsPage;
