
function calculateRankOpenSea(items) {

    for (let i = 0; i < items.length; i++) {
        //let rarityPorcentage=0;
        let rarityScore=0;
        for (let j = 0; j < items[i].traits.length; j++) {
            let rarity = items[i].traits[j].trait_count / items.length;
            let score = 1 / rarity;
            rarityScore += score;
        }
        items[i].rarityScore = rarityScore;

    }
    

    //ordernar por rarityScore
    items.sort(function (a, b) {
        return b.rarityScore - a.rarityScore;
    }
    );

    //rank  
    for (let i = 0; i < items.length; i++) {
        items[i].rank = i + 1;
    }

    return items;


    
}

    module.exports = calculateRankOpenSea;