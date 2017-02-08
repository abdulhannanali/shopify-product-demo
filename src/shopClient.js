import ShopifyBuy from 'shopify-buy'
import {
    SHOPIFY_API_KEY,
    SHOPIFY_DOMAIN,
    SHOPIFY_APP_ID
} from './constants'

const shopClient = ShopifyBuy.buildClient({
    domain: SHOPIFY_DOMAIN,
    appId: SHOPIFY_APP_ID,
    apiKey: SHOPIFY_API_KEY
})

window.shopClient = shopClient
export default shopClient
