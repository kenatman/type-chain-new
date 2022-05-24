import crypto from "crypto";

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
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }

  public getBlocks() {
    return [...this.blocks]; // 불변성을 지키며 리턴해야 원본을 변경 못한다.
  }
}

const blockChain = new BlockChain();
blockChain.addBlock('first');
blockChain.addBlock('second');
blockChain.addBlock('third');

console.log(blockChain.getBlocks());
