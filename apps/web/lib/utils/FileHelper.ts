const UNITS = ["B", "KB", "MB", "GB"] as const;
type Unit = (typeof UNITS)[number];

export default class FileHelper {
  static formatSize(bytes: number): string {
    if (bytes <= 0) return "0 B";

    const unitIndex = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      UNITS.length - 1
    );

    const value = bytes / 1024 ** unitIndex;

    return `${value.toFixed(2)} ${UNITS[unitIndex]}`;
  }
}
