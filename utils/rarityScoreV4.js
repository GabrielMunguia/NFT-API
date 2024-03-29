async function generateRarityV2(allNFTs) {
  
    const totalNum = allNFTs.length;
    

    let metadata = allNFTs.map((e) => e.traits);

    let tally = { TraitCount: {} };

    for (let j = 0; j < metadata.length; j++) {
        let nftTraits = metadata[j].map((e) => e.trait_type);
        let nftValues = metadata[j].map((e) => e.value);

        let numOfTraits = nftTraits.length;

        if (tally.TraitCount[numOfTraits]) {
            tally.TraitCount[numOfTraits]++;
        } else {
            tally.TraitCount[numOfTraits] = 1;
        }

        for (let i = 0; i < nftTraits.length; i++) {
            let current = nftTraits[i];
            if (tally[current]) {
                tally[current].occurences++;
            } else {
                tally[current] = { occurences: 1 };
            }

            let currentValue = nftValues[i];
            if (tally[current][currentValue]) {
                tally[current][currentValue]++;
            } else {
                tally[current][currentValue] = 1;
            }
        }
    }

    const collectionAttributes = Object.keys(tally);
    let nftArr = [];
    for (let j = 0; j < metadata.length; j++) {
        let current = metadata[j];
        let totalRarity = 0;
        for (let i = 0; i < current.length; i++) {
            let rarityScore =
                1 / (tally[current[i].trait_type][current[i].value] / totalNum);
            current[i].rarityScore = rarityScore;
            totalRarity += rarityScore;
        }

        let rarityScoreNumTraits =
            1.25 * (1 / (tally.TraitCount[Object.keys(current).length] / totalNum));
        current.push({
            trait_type: "TraitCount",
            value: Object.keys(current).length,
            rarityScore: rarityScoreNumTraits,
        });
        totalRarity += rarityScoreNumTraits;

        if (current.length < collectionAttributes.length) {
            let nftAttributes = current.map((e) => e.trait_type);
            let absent = collectionAttributes.filter(
                (e) => !nftAttributes.includes(e)
            );

            absent.forEach((type) => {
                let rarityScoreNull =
                    1 / ((totalNum - tally[type].occurences) / totalNum);
                current.push({
                    trait_type: type,
                    value: null,
                    rarityScore: rarityScoreNull,
                });
                totalRarity += rarityScoreNull;
            });
        }

        if (allNFTs[j].metadata) {
            allNFTs[j].metadata = JSON.parse(allNFTs[j].metadata);
            allNFTs[j].image = resolveLink(allNFTs[j].metadata.image);
        } else if (allNFTs[j].token_uri) {
            try {
                await fetch(allNFTs[j].token_uri)
                    .then((response) => response.json())
                    .then((data) => {
                        allNFTs[j].image = resolveLink(data.image);
                    });
            } catch (error) {
                console.log(error);
            }
        }

        nftArr.push({
            rarityScore: totalRarity,
            ...allNFTs[j],
        });
    }

    nftArr.sort((a, b) => b.rarityScore - a.rarityScore);

    for (let i = 0; i < nftArr.length; i++) {
        nftArr[i].rank = i + 1;
        
    }

    return nftArr;
}

module.exports = generateRarityV2;
