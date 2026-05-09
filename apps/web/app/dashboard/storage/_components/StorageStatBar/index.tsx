import React from "react";
import { barColorsHex, StorageBar } from "@/lib/types/common";

interface StorageStatBarProps {
  data: StorageBar;
}

const StorageStatBar = ({ data }: StorageStatBarProps) => {
  const { capacity, usedPerTypes = [] } = data;

  if (!capacity || usedPerTypes.length === 0)
    return (
      <div className="bg-gray-300 border border-solid border-slate-400 w-ful h-4 rounded-2xl "></div>
    );

  const totalUsed = usedPerTypes.reduce((sum, item) => sum + item.size, 0);

  const validSegment = usedPerTypes.filter((item) => item.size > 0);

  return (
    <div className="bg-gray-300 border border-solid border-slate-400 w-full h-4 rounded-2xl overflow-hidden flex">
      {validSegment.map((item, index) => {
        let widthPrecent = (item.size / capacity) * 100;
        widthPrecent = Math.ceil(widthPrecent);
        const widthStyle = `${widthPrecent}%`;
        const color = barColorsHex[index];
        return (
          <div
            key={`${item.type}-${index}`}
            className="h-full"
            style={{
              width: widthStyle,
              backgroundColor: color,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default StorageStatBar;
