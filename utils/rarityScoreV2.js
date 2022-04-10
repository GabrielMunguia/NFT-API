function rarityRank(assets) {

    let tally = { TraitCount: {} };

    for (let i = 0; i < assets.length; i++) {

    
      let nftTraits = assets[i].traits.map((e) => e.trait_type);
     
      let nftValues = assets[i].traits.map((e) => e.value);
      

      let numOfTraits = nftTraits.length;
   
      if (tally.TraitCount[numOfTraits]) {
        tally.TraitCount[numOfTraits]++;
      } else {
        tally.TraitCount[numOfTraits] = 1;
      }

      for (let j = 0; j < nftTraits.length; j++) {
        let current = nftTraits[j];
        if (tally[current]) {
          tally[current].occurences++;
        } else {
          tally[current] = { occurences: 1 };
        }

        let currentValue = nftValues[j];
        if (tally[current][currentValue]) {
          tally[current][currentValue]++;
        } else {
          tally[current][currentValue] = 1;
        }

      }
    }
    ///--------------

    const collectionAttributes = Object.keys(tally);
    //onst nftArr=[];

    

    for(let i = 0; i < assets.length; i++){

      
      let current= assets[i].traits;
      let totalRarity = 0;

      
      for(let j = 0; j < current.length; j++){
        
        let rarityScore= (1/(tally[current[j].trait_type][current[j].value]/assets.length));
        current.rarityScore= rarityScore;
        
        totalRarity+= rarityScore;
      }

      let rarityScoreNumTraits= (1/(tally.TraitCount[Object.keys(current).length]/assets.length));

      current.push({
        trait_type:"TraitCount",
        value:Object.keys(current).length,
        rarityScore:rarityScoreNumTraits
      });
      totalRarity+= rarityScoreNumTraits;



      if(current.length<collectionAttributes.length){
        let nftAtributes= current.map((e)=>e.trait_type);
        let absent= collectionAttributes.filter((e)=>!nftAtributes.includes(e));

        absent.forEach(type=>{
          let rarityScoreNull= 1/((assets.length-tally[type].occurences)/assets.length);
          current.push({
            trait_type:type,
            value:null,
            rarityScore:rarityScoreNull,
          });
          totalRarity+= rarityScoreNull;
        });

      }
      assets[i].rarityScore= totalRarity;
      assets[i].rarityScoreNumTraits= rarityScoreNumTraits;
      

    }

    assets.sort((a, b) => b.rarityScore - a.rarityScore);

    for (let i = 0; i < assets.length; i++) {
      assets[i].rank = i + 1;
    }

    return assets;

}
module.exports = rarityRank;