import { ReactNode, forwardRef, ForwardedRef } from "react";

const PAGE_SIZES = {
  A3: { width: 297, height: 420 },
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
  B4: { width: 250, height: 353 },
  B5: { width: 176, height: 250 },
};

type PageSize = keyof typeof PAGE_SIZES | "custom";
type PageOrientation = "portrait" | "landscape";

interface PageProps {
  children?: ReactNode;
  size?: PageSize;
  orientation?: PageOrientation;
  padding?: number | string; // 内边距，单位：mm 或 CSS 字符串
  backgroundColor?: string;
  className?: string;
  scale?: number;
  customWidth?: number; // 自定义宽度，单位：mm
  customHeight?: number; // 自定义高度，单位：mm
}

const Page = forwardRef(function Page(
  {
    children,
    size = "A4",
    orientation = "portrait",
    padding = 25,
    backgroundColor = "white",
    className = "",
    scale = 1,
    customWidth,
    customHeight,
  }: PageProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  // 获取尺寸信息
  let width, height;
  if (size === "custom" && customWidth && customHeight) {
    width = customWidth;
    height = customHeight;
  } else {
    const sizeInfo = PAGE_SIZES[size as keyof typeof PAGE_SIZES];
    width = sizeInfo.width;
    height = sizeInfo.height;
  }

  // 根据方向确定宽高
  const paperWidth = orientation === "portrait" ? `${width}mm` : `${height}mm`;
  const paperHeight = orientation === "portrait" ? `${height}mm` : `${width}mm`;
  const paperPadding = typeof padding === "number" ? `${padding}mm` : padding;

  // 计算缩放后的样式
  const scaledStyle =
    scale !== 1
      ? {
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }
      : {};

  const printStyles = {
    "@media print": { margin: 0, boxShadow: "none", border: "none" },
  };

  return (
    <div
      ref={ref}
      className={`${className} overflow-hidden mx-auto shadow-lg`}
      style={{
        width: paperWidth,
        height: paperHeight,
        backgroundColor,
        border: `1px solid #e5e7eb`,
        padding: paperPadding,
        boxSizing: "border-box",
        ...scaledStyle,
        ...printStyles,
      }}
    >
      {children}
    </div>
  );
});

export default Page;
