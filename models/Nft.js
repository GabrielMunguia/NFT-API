const { DataTypes } =require( 'sequelize');
const  db = require( '../db/conexion');

const Nft = db.define('Nft', {
   name:{
         type: DataTypes.STRING,
   },
   slug:{
    type: DataTypes.STRING,
   },
   price:{
    type: DataTypes.FLOAT,
    },
    animation_original_url:{
        type: DataTypes.STRING,
    },
    animation_url:{
        type: DataTypes.STRING,
    }
   
    ,asset_contract_address:{
        type: DataTypes.STRING,
    }
    ,asset_contract_asset_contract_type:{
        type: DataTypes.STRING,
    }

    ,asset_contract_created_date:{
        type: DataTypes.STRING,
    },
    only_proxied_transfers:{
        type: DataTypes.BOOLEAN,
    }
    
    ,asset_contract_external_link:{
        type: DataTypes.STRING,
    }
    ,asset_contract_image_url:{
        type: DataTypes.STRING,
    }
    ,asset_contract_name:{
        type: DataTypes.STRING,
    }
    ,asset_contract_nft_version:{
        type: DataTypes.STRING,
    },
    asset_contract_opensea_buyer_fee_basis_points:{
        type: DataTypes.STRING,
    },
    asset_contract_opensea_seller_fee_basis_points:{
        type: DataTypes.STRING,
    },
    asset_contract_symbol:{
        type: DataTypes.STRING,
    },
    asset_contract_total_supply:{
        type: DataTypes.STRING,
    }
    ,creator_address:{
        type: DataTypes.STRING,
    }
    ,creator_profile_img_url:{
        type: DataTypes.STRING,
    }
    ,creator_config:{
        type: DataTypes.STRING,
    }
    ,creator_username:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.TEXT,
    },
    external_link:{
        type: DataTypes.STRING,
    },
    image_original_url: {
        type: DataTypes.STRING,
    },
    image_preview_url: {
        type: DataTypes.STRING,
    },
    image_thumbnail_url: {
        type: DataTypes.STRING,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    is_nsfw: {
        type: DataTypes.BOOLEAN,
    },
    is_presale: {
        type: DataTypes.BOOLEAN,
    },
    last_sale_asset_bundle: {
        type: DataTypes.STRING,
    },
    last_sale_quantity: {
        type: DataTypes.INTEGER,
    },
    last_sale_auction_type: {
        type: DataTypes.STRING,
    },
    last_sale_created_date: {
        type: DataTypes.STRING,
    },
    last_sale_event_timestamp: {
        type: DataTypes.STRING,
    },
    last_sale_event_type:{
        type: DataTypes.STRING,
    },
    last_sale_payment_token_address:{
        type: DataTypes.STRING,
    },
    last_sale_payment_token_eth_price:{
        type: DataTypes.STRING,
    },
    last_sale_payment_token_image_url:{
        type: DataTypes.STRING,
    },
    last_sale_payment_token_name:{
        type: DataTypes.STRING,
    },
    last_sale_payment_token_symbol:{
        type: DataTypes.STRING,
    },
    last_sale_payment_token_usd_price:{
        type: DataTypes.STRING,
    },
    listing_date:{
        type: DataTypes.STRING,
    },
    num_sales:{
        type: DataTypes.INTEGER,
    },
    owner_address:{
        type: DataTypes.STRING,
    },
    owner_config:{
        type: DataTypes.STRING,
    },
    owner_profile_img_url:{
        type: DataTypes.STRING,
    },
    owner_username:{
        type: DataTypes.STRING,
    },
    permalink:{
        type: DataTypes.STRING,
    },
    rank:{
        type: DataTypes.INTEGER,
    },
    rarityScore:{
        type: DataTypes.FLOAT,
    },
    sell_orders:{
        type: DataTypes.STRING,
    },
    token_id:{
        type: DataTypes.TEXT,
    },
    token_metadata:{
        type: DataTypes.STRING,
    },
    top_bid:{
        type: DataTypes.STRING,
    },
    transfer_fee:{
        type: DataTypes.STRING,
    },
    transfer_fee_payment_token:{
        type: DataTypes.STRING,
    },
    traits:{
        type: DataTypes.TEXT,
    }

   
 

    



    
    
});

const setTabla= async()=>{
    await Nft.sync();
}
setTabla();
module.exports = Nft;