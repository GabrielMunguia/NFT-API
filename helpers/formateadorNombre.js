 const formateadorNombre=(nft)=>{
    try {
        
        let name=nft.name || nft.asset_contract.name;

    if(!name.includes("#")){
        let tokenId=nft.token_id+"";
        name=name+" #"+tokenId;
        if(name.length>17){
            let split =17-tokenId.length;
            name=name.substring(0,split)+"...";
            name=name+" #"+tokenId;
        }
    }

    return name;
    } catch (error) {
        return nft.name;
    }
}

module.exports={
    formateadorNombre
}