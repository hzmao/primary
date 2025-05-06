import { forwardRef, ForwardedRef } from "react";

interface CharProps {
  char?: string;
  pinyin?: string;
  width?: number | string;
  colors?: { background?: string; char?: string; line?: string };
  className?: string;
}

const px2rem = (px: number) => {
  return px / 16;
};

const getWidth = (width?: number | string) => {
  if (typeof width === "number") {
    return width;
  }
  if (typeof width === "string") {
    const match = width.match(/^(\d+)(px|rem)$/);
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];
      if (unit === "px") {
        return px2rem(value);
      }
      return value;
    }
  }
  return 6;
};

export default function Char(props: CharProps) {
  const { char, pinyin, width: _width = 6, colors, className } = props;
  const width = getWidth(_width);
  const itemWidth = width;
  const height = pinyin ? (3 * itemWidth) / 2 : itemWidth;
  const lineColor = colors?.line ?? "pink";
  const charColor = colors?.char ?? "black";
  const backgroundColor = colors?.background ?? "transparent";
  const pinyinFontSize = `${itemWidth * 0.3}rem`;
  const charFontSize = `${itemWidth * 0.85}rem`;
  const pinyinMarginTop = `-${itemWidth * 0.079 - 0.12}rem`;

  return (
    <View
      className={`border bg-opacity-60 ${className}`}
      style={{
        width: `${itemWidth}rem`,
        height: `${height}rem`,
        borderColor: lineColor,
        backgroundColor: backgroundColor,
        color: charColor,
        background: backgroundColor,
      }}
    >
      {pinyin && (
        <View className="relative h-1/3">
          <View
            className="absolute w-full border-t border-dashed top-1/3"
            style={{ borderColor: lineColor }}
          />
          <View
            className="absolute w-full border-t border-dashed top-2/3"
            style={{ borderColor: lineColor }}
          />
          <View className="absolute inset-0 flex items-center justify-center">
            <Text
              className="text-center"
              style={{ fontSize: pinyinFontSize, marginTop: pinyinMarginTop }}
            >
              {pinyin}
            </Text>
          </View>
        </View>
      )}
      <View className={`relative ${pinyin ? "h-2/3" : "h-full"}`}>
        {pinyin && (
          <View
            className="absolute w-full h-full border-t"
            style={{ borderColor: lineColor }}
          />
        )}
        <View
          className="absolute h-full border-l border-dashed left-1/2"
          style={{ borderColor: lineColor }}
        />
        <View
          className="absolute h-full border-t border-dashed top-1/2"
          style={{ borderColor: lineColor }}
        />
        <View
          className="absolute border-t border-dashed"
          style={{
            width: "141%",
            height: "0px",
            borderColor: lineColor,
            transform: "rotate(45deg)",
            transformOrigin: "0 0",
            left: 0,
            top: 0,
          }}
        />
        <View
          className="absolute border-t border-dashed"
          style={{
            width: "141%",
            height: "0px",
            borderColor: lineColor,
            transform: "rotate(-45deg)",
            transformOrigin: "100% 0",
            right: 0,
            top: 0,
          }}
        />
        <View className="absolute inset-0 flex items-center justify-center">
          <Text
            style={{ fontSize: charFontSize, fontFamily: "KaiTi" }}
            className="text-center"
          >
            {char?.trim()}
          </Text>
        </View>
      </View>
    </View>
  );
}

type ElementProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  as?: "div" | "span";
};
const Element = forwardRef(
  (
    { as = "div", ...props }: ElementProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const Component = as;
    return <Component ref={ref} {...props} />;
  }
);

const View = Element as React.FC<ElementProps>;
const Text = ({ as = "span", ...props }: ElementProps) => (
  <Element as={as} {...props} />
);
