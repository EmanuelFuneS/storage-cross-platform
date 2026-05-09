type Size = "B" | "KB" | "MB" | "GB";

export default class FileHelper {
  static formatSize(size: number, type: Size) {
    switch (type) {
      case "KB":
        return `${(size / 1024).toFixed(2)} KB`;

      case "MB":
        return `${(size / 1024 ** 2).toFixed(2)} MB`;
      case "GB":
        return `${(size / 1024 ** 3).toFixed(2)} GB`;
      default:
        return `${size} B`;
    }
  }
  //available storage
}
