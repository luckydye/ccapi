/**
 * A number, or a string containing a number.
 * @typedef {{ path: string}} Storage
 */

export class CCAPI {
  /**
   * @type {`${number}.${number}.${number}.${number}:${number}`}
   */
  host = undefined;

  /**
   * @param {`${number}.${number}.${number}.${number}:${number}`} ip
   */
  constructor(ip) {
    this.host = ip;
  }

  // abstract fetch function, so the strategy used to fetch can be chosen from the outside too.
  async fetch(endpoint) {
    return fetch(`http://${this.host}${endpoint}`, {}).then(async (res) => {
      if (res.ok) {
        switch (res.headers.get("Content-Type")) {
          case "application/json":
            return res.json();
          default:
            return res.blob();
        }
      }
      throw new Error(`${res.status} ${res.statusText} ${await res.text()}`);
    });
  }

  async index() {
    return await this.fetch("/ccapi");
  }

  /**
   * @returns {Promise<Storage[]>}
   */
  async storage() {
    return await this.fetch("/ccapi/ver110/devicestatus/storage").then(
      (data) => {
        return data.storagelist;
      },
    );
  }

  /**
   * @param {Storage} storage
   */
  async files(storage) {
    const folders = await this.fetch(storage.path);
    /** @type {string[]} */
    const filePaths = [];
    for (const folder of folders.path) {
      const files = await this.fetch(folder);
      filePaths.push(...files.path);
    }
    return filePaths;
  }

  /**
   * @param {string} filePath
   */
  async thumbnail(filePath) {
    return await this.fetch(`${filePath}?kind=thumbnail`);
  }

  /**
   * @param {string} filePath
   */
  async info(filePath) {
    return await this.fetch(`${filePath}?kind=info`);
  }

  /**
   * @param {string} filePath
   */
  async original(filePath) {
    return await this.fetch(filePath);
  }
}
