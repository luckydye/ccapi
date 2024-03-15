export class CCAPI {

  /**
   * @type {`${number}.${number}.${number}.${number}`}
   */
  ip = undefined;

  /**
   * @param {`${number}.${number}.${number}.${number}`} ip
   */
  constructor(ip) {
    this.ip = ip;
  }

  async fetch(endpoint) {
    return fetch(`http://${this.ip}/ccapi${endpoint}`).then(async res => {
      if(res.ok) return res.json();
      throw new Error(await res.text())
    });
  }

  async listFiles(storage, folder) {
    const list = await this.fetch("/ver110/contents/sd2/" + folder);
    return list;
  }

  // http://192.168.251.75:8080/ccapi/ver110/contents/sd2/100CANON

}
