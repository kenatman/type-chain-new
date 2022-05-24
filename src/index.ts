interface IBlock {
  prevHash: string;
  height: number;
  data: string;
  hash: string;
}

class Block implements IBlock {
  public hash: string;

  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return toHash;
  }
}
