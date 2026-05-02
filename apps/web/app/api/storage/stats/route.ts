export async function GET(req: Request) {
  return {
    fileStat: {}, //metric of file types (count files and total size)
    storageStat: {}, //metric of storage Bar (count total sizes of files)
  };
}
