import { CoinGeckoClient } from "coingecko-api-v3";

const client = new CoinGeckoClient();

export const calculateUsdBalance = async (nearBalance: string) => {
    try {
        const data = await client.simplePrice({
            ids: 'near',
            vs_currencies: 'usd'
        });
        const { near } = data;
        return (near.usd * Number(nearBalance)).toFixed(2).toString();
    } catch (err) {
        console.log(err)
    }
}