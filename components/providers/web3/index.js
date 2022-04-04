import { createContext, useContext, useEffect, useState, useMemo } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { useAccount, useNetwork, useOwnedCourses } from "@components/hooks";
import { enhanceHook } from "@components/hooks";
import { loadContract } from "@utils/loadContract";

const Web3Context = createContext(null);

const Web3Provider = ({ children }) => {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
  });

  const accountConnected = enhanceHook(
    useAccount({
      web3: web3Api.web3,
      provider: web3Api.provider,
    })
  );

  const networkConnected = enhanceHook(
    useNetwork({
      web3: web3Api.web3,
      provider: web3Api.provider,
    })
  );

  // load provider
  useEffect(() => {
    const loadProvider = async () => {
      let provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        // load contract
        const contract = await loadContract('CourseMarketplace', web3);
        setWeb3Api({
          provider,
          web3,
          contract,
          isLoading: false,
        });
      } else {
        setWeb3Api((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      accountConnected,
      networkConnected,
      connect: web3
        ? async () => {
            try {
              await provider.request({
                method: "eth_requestAccounts",
              });
            } catch {
              location.reload();
            }
          }
        : () => console.log("Cannot connect to Metamask!"),
    };
  }, [web3Api, accountConnected, networkConnected]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export default Web3Provider;
