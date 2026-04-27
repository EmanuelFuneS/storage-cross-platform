import { db } from "..";
import { typesTable } from "../schema";

const types = [
  {
    name: "image",
    subType: [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
      "bmp",
      "tiff",
      "ico",
      "heic",
    ],
  },
  {
    name: "video",
    subType: ["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm", "m4v", "mpeg"],
  },
  {
    name: "audio",
    subType: ["mp3", "wav", "flac", "aac", "ogg", "wma", "m4a", "opus"],
  },
  {
    name: "document",
    subType: [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "odt",
      "ods",
      "odp",
      "txt",
      "rtf",
      "csv",
    ],
  },
  {
    name: "code",
    subType: [
      "js",
      "ts",
      "py",
      "java",
      "c",
      "cpp",
      "cs",
      "go",
      "rs",
      "php",
      "rb",
      "html",
      "css",
      "json",
      "xml",
      "yaml",
      "sh",
    ],
  },
  {
    name: "compressed",
    subType: ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"],
  },
  {
    name: "executable",
    subType: ["exe", "msi", "dmg", "pkg", "deb", "rpm", "appimage", "iso"],
  },
  {
    name: "font",
    subType: ["ttf", "otf", "woff", "woff2", "eot"],
  },
];

async function seed() {
  console.log("sedding types...");

  await db.insert(typesTable).values(types).onConflictDoNothing();

  console.log("Types seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed: ", err);
  process.exit(1);
});
