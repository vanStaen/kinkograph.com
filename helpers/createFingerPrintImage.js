const fetch = require("node-fetch");
const blockhash = require("blockhash-core");

const { imageFromBuffer, getImageData } = require("@canvas/image");

const createFingerPrintImage = async (imgUrl) => {
  try {
    const response = await fetch(imgUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await Buffer.from(arrayBuffer);
    const data = await imageFromBuffer(buffer)
    const hash = await blockhash.bmvbhash(getImageData(data), 8);
    return hexToBin(hash);
  } catch (error) {
    console.log(error);
  }
};

function hexToBin(hexString) {
  const hexBinLookup = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    a: "1010",
    b: "1011",
    c: "1100",
    d: "1101",
    e: "1110",
    f: "1111",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let result = "";
  for (i = 0; i < hexString.length; i++) {
    result += hexBinLookup[hexString[i]];
  }
  return result;
}

module.exports = createFingerPrintImage;
