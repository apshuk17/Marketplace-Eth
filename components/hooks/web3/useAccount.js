import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

const adminAddresses = {
  "0xadb80a74270affa4992cfb94fdc320e08ac26529751fda5481ab933fd8fc39ed": true,
};


const useAccount = ({ web3, provider }) => {
  const { mutate } = useSWRConfig();
  const { data, ...swrResponse } = useSWR(
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0] ?? null;
    }
  );

  useEffect(() => {
    /* The value of provider for the metamask is window.ethereum **/
    if (provider) {
      provider.on("accountsChanged", () => {
        mutate("web3/accounts");
      });
    }
  }, [provider, mutate]);

  return {
      data,
      mutate,
      isAdmin: (web3 && data && !!adminAddresses[web3.utils.keccak256(data)]) ?? false,
      ...swrResponse,
    };
};

export default useAccount;
