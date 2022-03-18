import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

const NETWORKS = {
  1: "Ethereum Main Network (Mainnet)",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache"
};

const useNetwork = ({ web3, provider }) => {
  const { mutate } = useSWRConfig();
  const { data, ...swrResponse } = useSWR(
    web3 ? "web3/network" : null,
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    if (provider) {
      provider.on("chainChanged", () => {
        mutate("web3/network");
      });
    }
  }, [provider, mutate]);

  return {
    network: {
      data,
      mutate,
      ...swrResponse,
    },
  };
};

export default useNetwork;
