import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

const adminAddresses = {
  "0xadb80a74270affa4992cfb94fdc320e08ac26529751fda5481ab933fd8fc39ed": true,
};

const useAccount = ({ web3, provider }) => {
  // const [account, setAccount] = useState(null);
  const { mutate } = useSWRConfig();
  const { data, ...swrResponse } = useSWR(
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0] ?? null;
    }
  );

  // console.log('##swrData', swrResponse.data);

  // useEffect(() => {
  //     const getAccount = async () => {
  //         const accounts = await web3.eth.getAccounts();
  //         if (accounts.length) setAccount(accounts[0])
  //     }
  //     if (web3) getAccount();
  // }, [web3]);

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        mutate("web3/accounts");
      });
    }
  }, [provider, mutate]);

  return {
    account: {
      data,
      mutate,
      isAdmin: (web3 && data && !!adminAddresses[web3.utils.keccak256(data)]) ?? false,
      ...swrResponse,
    },
  };
};

export default useAccount;
