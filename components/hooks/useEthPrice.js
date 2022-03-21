import useSWR from "swr";

const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

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
  const swrResponse = useSWR(URL, fetcher, { refreshInterval: 10000 });
  return { eth: { ...swrResponse } };
};

export default useEthPrice;
