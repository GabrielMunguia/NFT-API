const assetAdapter= (asset)=>{
    const newAsset={
        name:asset.name,
        collection:{
            slug:asset.slug
        },
        serial_number:asset.serial_number,
        price:asset.price,
        animation_original_url:asset.animation_original_url,
        animation_url:asset.animation_url,
        asset_contract:{
            address:asset.asset_contract_address,
            asset_contract_type:asset.asset_contract_asset_contract_type,
            created_date:asset.asset_contract_created_date,
            only_proxied_transfers:asset.asset_contract_only_proxied_transfers,
            external_link:asset.asset_contract_external_link,
            image_url:asset.asset_contract_image_url,
            name:asset.asset_contract_name,
            nft_version:asset.asset_contract_nft_version,
            opensea_buyer_fee_basis_points:asset.asset_contract_opensea_buyer_fee_basis_points,
            opensea_seller_fee_basis_points:asset.asset_contract_opensea_seller_fee_basis_points,
            symbol:asset.asset_contract_symbol,
            total_supply:asset.asset_contract_total_supply,
       
        },
        creator:{
            address:asset.creator_address,
            profile_img_url:asset.creator_profile_img_url,
            confing:asset.creator_confing,
            user:{
                username:asset.creator_username,
            }
        },
        description:asset.description,
        external_link:asset.external_link,
        image_original_url:asset.image_original_url,
        image_preview_url:asset.image_preview_url,
        image_thumbnail_url:asset.image_thumbnail_url,
        image_url:asset.image_url,
        is_nsfw:asset.is_nsfw,
        is_presale:asset.is_presale,
        last_sale:{
            asset_bundle:asset.last_sale_asset_bulde,
            quantity:asset.last_sale_quantity,
            auction_type:asset.last_sale_auction_type,
            create_date:asset.last_sale_create_date,
            event_timestamp:asset.last_sale_event_timestamp,
            event_type:asset.last_sale_event_type,
            payment_token:{
                address:asset.last_sale_payment_token_address,
                eth_price:asset.last_sale_payment_token_eth_price,
                image_url:asset.last_sale_payment_token_image_url,
                name:asset.last_sale_payment_token_name,
                symbol:asset.last_sale_payment_token_symbol,
                usd_price:asset.last_sale_payment_token_usd_price,
            },
           

            

        },
        listing_date:asset.last_sale_listing_date,
        num_sales:asset.last_sale_num_sales,
        owner:{
            address:asset.last_sale_owner_address,
            config:asset.last_sale_owner_config,
            profile_img_url:asset.last_sale_owner_profile_img_url,
            user:{
                username:asset.last_sale_owner_username,
            }
        },
        permalink:asset.permalink,
        rank:asset.rank,
        rarityScore:asset.rarityScore,
        sell_orders:asset.sell_orders,
        token_id:asset.token_id,
        token_metadata:asset.token_metadata,
        top_bid:asset.top_bid,
        transfer_fee:asset.transfer_fee,
        transfer_fee_payment_token:asset.transfer_fee_payment_token,
        traits:JSON.parse(asset.traits),











    }

    return newAsset;

}

module.exports=assetAdapter;