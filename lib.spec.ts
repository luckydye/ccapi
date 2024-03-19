import { test } from "bun:test";
import { CCAPI } from "./lib";

const IP = "192.168.1.60:8080";

test("index", async () => {
  const camera = new CCAPI(IP);
  const index = await camera.index();
  console.log(index);
});

test("get first file thumbnail", async () => {
  const camera = new CCAPI(IP);
  const storageList = await camera.storage();
  const storage = storageList[0];
  if (!storage) {
    throw new Error("No storage found");
  }
  const files = await camera.files(storage);

  const info = await camera.info(files[0]);
});
