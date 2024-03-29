import { useWeb3 } from "@components/providers";

const useWalletInfo = () => {
  const { accountConnected, networkConnected } = useWeb3();
  const { data: accountNumber, isEmpty: isAccountEmpty, isAdmin } = accountConnected;
  const {
    data: networkName,
    target: targetNetwork,
    isSupported,
    hasInitialResponse,
  } = networkConnected;

  const canPurchaseCourse = !!(accountNumber && isSupported);

  return {
      accountNumber,
      networkName,
      targetNetwork,
      isSupported,
      hasInitialResponse,
      canPurchaseCourse,
      isAccountEmpty,
      isAdmin
  }

};

export default useWalletInfo;
