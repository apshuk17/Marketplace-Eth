import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

const NETWORKS = {
  1: "Ethereum Main Network (Mainnet)",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

const useNetwork = ({ web3, provider }) => {
  const { mutate } = useSWRConfig();
  const { data, ...swrResponse } = useSWR(
    web3 ? "web3/network" : null,
    async () => {
      const chainId = await web3.eth.getChainId();

      if (!chainId) {
        throw new Error("Cannot retrieve a network.");
      }

      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    const mutator = () => mutate("web3/network");
    provider?.on("chainChanged", mutator);
  }, [provider, mutate]);

  return {
    data,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    mutate,
    ...swrResponse,
  };
};

export default useNetwork;
