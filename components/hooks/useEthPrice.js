import useSWR from "swr";

const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

const COURSE_PRICE = 15;

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json?.market_data?.current_price?.usd ?? null;
  } catch (error) {
    console.error("Error in fetching data", error);
  }
};

const useEthPrice = () => {
  const {data, ...rest} = useSWR(URL, fetcher, { refreshInterval: 10000 });
  const pricePerItem = data ? (COURSE_PRICE / Number(data)).toFixed(6) : null;
  return { eth: { data, pricePerItem, ...rest } };
};

export default useEthPrice;
