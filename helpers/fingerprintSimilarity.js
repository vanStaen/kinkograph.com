const fingerprintSimilarity = (hash1, hash2) => {
    let similarity = 0;
    hash1Array = hash1.split("");
    hash1Array.forEach((bit, index) => {
      hash2[index] === bit ? similarity++ : null;
    });
    return parseInt((similarity / hash1.length) * 100);
  }

module.exports = fingerprintSimilarity;