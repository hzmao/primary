export type SettingsType = {
  allChars: string[];
  filteredChars: string[];
  from: number;
  to: number;
  colors: { pinyin: string; char: string };
};

type SettingsProps = {
  settings: SettingsType;
  onSetting: (setting: SettingsType) => void;
  className?: string;
};

const Settings = ({ settings, onSetting, className }: SettingsProps) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-row items-center gap-4">
        <span>拼音颜色：</span>
        <input
          type="color"
          value={settings.colors?.pinyin}
          onChange={(e) =>
            onSetting({
              ...settings,
              colors: { ...settings.colors, pinyin: e.target.value },
            })
          }
        />
        <span>字符颜色：</span>
        <input
          type="color"
          value={settings.colors?.char}
          onChange={(e) =>
            onSetting({
              ...settings,
              colors: { ...settings.colors, char: e.target.value },
            })
          }
        />
      </div>

      <div className="flex flex-row items-center gap-4">
        <span>显示范围：</span>

        <input
          type="number"
          placeholder="from"
          className="w-24 px-4 py-2 bg-gray-200 rounded"
          value={settings.from}
          onChange={(e) =>
            onSetting({ ...settings, from: Number(e.target.value) })
          }
        />
        <span>~</span>
        <input
          type="number"
          placeholder="to"
          className="w-24 px-4 py-2 bg-gray-200 rounded"
          value={settings.to}
          onChange={(e) =>
            onSetting({ ...settings, to: Number(e.target.value) })
          }
        />
      </div>

      <span className="-mb-4">共{settings.allChars.length}字</span>
      <textarea
        className="w-96 h-72 bg-green-300 p-2 rounded-md"
        placeholder="请输入需要显示的字"
        value={settings.allChars.join("")}
        onChange={(e) =>
          onSetting({ ...settings, allChars: e.target.value.split("") })
        }
      />
      <textarea
        className="w-96 h-36 bg-red-300 p-2 rounded-md"
        placeholder="请输入需要过滤的字"
        value={settings.filteredChars.join("")}
        onChange={(e) =>
          onSetting({ ...settings, filteredChars: e.target.value.split("") })
        }
      />
    </div>
  );
};

export default Settings;
