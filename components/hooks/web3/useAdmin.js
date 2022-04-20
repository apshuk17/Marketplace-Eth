import { useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "@components/providers";

const useAdmin = ({ redirectTo }) => {
  const {
    requireInstall,
    accountConnected: { data: account, hasInitialResponse, isAdmin, isEmpty },
  } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (requireInstall || (hasInitialResponse && !isAdmin) || isEmpty) {
      router.push(redirectTo);
    }
  }, [
    requireInstall,
    hasInitialResponse,
    isAdmin,
    isEmpty,
    redirectTo,
    router,
  ]);

  return { account, isAdmin };
};

export default useAdmin;
