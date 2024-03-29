
const main = require('../helpers/getPriceV1');
const { formateadorNombre } = require("./formateadorNombre");

const formateadorAsset = (asset) => {

  const nombreFormateado=formateadorNombre(asset);
  const nuevoAsset = {
    name: nombreFormateado?nombreFormateado : null,   
    slug: asset.collection.slug ? asset.collection.slug : null,
    price: main(asset),
    serial_number:(nombreFormateado&&nombreFormateado!=="")?(nombreFormateado.includes('#')?parseInt(nombreFormateado.split('#')[1]):0):0,
    asset_contract_address: asset.asset_contract.address?asset.asset_contract.address:null,   
    asset_contract_asset_contract_type:asset.asset_contract.asset_contract_type?asset.asset_contract.asset_contract_type:null,  
    asset_contract_created_date: asset.asset_contract.created_date ? asset.asset_contract.created_date : null,   
    // asset_contract_description: asset.asset_contract.description   ? asset.asset_contract.description : null,  
    asset_contract_external_link:asset.asset_contract.external_link?asset.asset_contract.external_link:null,    
    asset_contract_image_url: asset.asset_contract.image_url?asset.asset_contract.image_url:null   ,
    asset_contract_name:asset.asset_contract.name ? asset.asset_contract.name : null,
    asset_contract_nft_version:asset.asset_contract.nft_version  ? asset.asset_contract.nft_version : null,
    asset_only_proxied_transfers:asset.asset_contract.only_proxied_transfers?asset.asset_contract.only_proxied_transfers:null,
    asset_contract_opensea_buyer_fee_basis_points:asset.asset_contract.opensea_buyer_fee_basis_points ? asset.asset_contract.opensea_buyer_fee_basis_points : null,
    asset_contract_opensea_seller_fee_basis_points:asset.asset_contract.opensea_seller_fee_basis_points ? asset.asset_contract.opensea_seller_fee_basis_points : null,
    asset_contract_symbol:asset.asset_contract.symbol?asset.asset_contract.symbol:null,
    asset_contract_total_supply:asset.asset_contract.total_supply  ? asset.asset_contract.total_supply : null,
    creator_address:asset.creator?.address   ? asset.creator.address : null,
    creator_profile_img_url:asset.creator?.profile_img_url   ? asset.creator.profile_img_url : null,
    creator_config:asset.creator?.config   ? asset.creator.config : null,
    creator_username:asset.creator?.user?.username   ? asset.creator.user.username : null,
    description:asset.description   ? asset.description : null,
    external_link:asset.external_link   ? asset.external_link : null,
    image_original_url:asset.image_original_url      ? asset.image_original_url : null,
    image_preview_url:asset.image_preview_url   ? asset.image_preview_url : null,
    image_thumbnail_url:asset.image_thumbnail_url   ? asset.image_thumbnail_url : null,
    image_url:asset.image_url       ? asset.image_url : null,
    is_nsfw: asset.is_nsfw   ? asset.is_nsfw : null,
    is_presale: asset.is_presale?asset.is_presale:null   ,
    last_sale_asset_bundle:asset.last_sale?.asset_bundle?JSON.stringify(asset.last_sale?.asset_bundle):null   ,
    last_sale_quantity: asset.last_sale?.quantity   ? asset.last_sale?.quantity : null,
    last_sale_auction_type:asset.last_sale?.auction_type   ? asset.last_sale?.auction_type : null,
    last_sale_created_date:asset.last_sale?.created_date   ? asset.last_sale?.created_date : null,
    last_sale_event_timestamp:asset.last_sale?.event_timestamp   ? asset.last_sale?.event_timestamp : null,
    last_sale_event_type:asset.last_sale?.event_type   ? asset.last_sale?.event_type : null,
    last_sale_payment_token_address:asset.last_sale?.payment_token.address   ? asset.last_sale?.payment_token.address : null,
    last_sale_payment_token_eth_price:asset.last_sale?.payment_token.eth_price   ? asset.last_sale?.payment_token.eth_price : null,
    last_sale_payment_token_image_url:asset.last_sale?.payment_token.image_url   ? asset.last_sale?.payment_token.image_url : null,
    last_sale_payment_token_name:asset.last_sale?.payment_token.name   ? asset.last_sale?.payment_token.name : null,
    last_sale_payment_token_symbol:asset.last_sale?.payment_token.symbol   ? asset.last_sale?.payment_token.symbol : null,
    last_sale_payment_token_usd_price:asset.last_sale?.payment_token.usd_price   ? asset.last_sale?.payment_token.usd_price : null,
    listing_date:asset.listing_date   ? asset.listing_date : null,
    num_sales:asset.num_sales   ? asset.num_sales : null,
    owner_address:asset.owner?.address  ? asset.owner.address : null,      
    owner_config:asset.owner?.config   ? asset.owner.config : null,
    owner_profile_img_url:asset.owner?.profile_img_url   ? asset.owner.profile_img_url : null,
    owner_username:asset.owner?.user?.username  ? asset.owner.user.username : null,
    permalink:asset.permalink   ? asset.permalink : null,
    rank:asset.rank   ? asset.rank : null,
    rarityScore: asset.rarityScore   ? asset.rarityScore : null,
    // sell_orders:asset.sell_orders   ? asset.sell_orders : null,
    token_id:asset.token_id   ? asset.token_id : null,
    // token_metadata:asset.token_metadata   ? asset.token_metadata : null,
    top_bid:asset.top_bid   ? asset.top_bid : null,
    transfer_fee:asset.transfer_fee   ? asset.transfer_fee : null,
    transfer_fee_payment_token:asset.transfer_fee_payment_token   ? asset.transfer_fee_payment_token : null,
    traits:asset.traits   ? JSON.stringify(asset.traits) : null,
  };



  return nuevoAsset;
};

module.exports=formateadorAsset
