export interface IResponseApi {
  status: number;
  ok?: boolean;
  error?: string;
  data?: any;
}

export interface StorageBar {
  capacity: number;
  usedPerTypes?: {
    type: string;
    size: number;
  }[];
}

export interface FileStatType {
  typeName: string;
  count: number;
  totalSize: number;
}

export interface StorageStats {
  totalFiles: number;
  totalSize: number;
}

export interface StatsReponse {
  fileStats: FileStatType[];
  storageStat: StorageStats;
}

export const barColorsTail = [
  "bg-blue-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-slate-500",
  "bg-red-500",
];


export const barColorsHex = [
  "#3b82f6", // azul-500
  "#eab308", // amarillo-500
  "#22c55e", // verde-500
  "#64748b", // pizarra-500
  "#ef4444", // rojo-500
];