import { useWeb3 } from "@components/providers";
import { Button, ActiveLink } from "@components/ui/common";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, isLoading, accountConnected, requireInstall } = useWeb3();
  const { data: accountNumber, isAdmin } = accountConnected;
  const { pathname } = useRouter();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div>
              <ActiveLink href="/" activeLinkClass="text-yellow-600">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>
              <ActiveLink href="/blogs">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </ActiveLink>
            </div>
            <div className="text-center">
              <ActiveLink href="/wishlist">
                <a className="font-medium sm:mr-8 mr-1 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </ActiveLink>
              {isLoading ? (
                <Button className="w-40" variant="purple" disabled={true}>
                  Loading...
                </Button>
              ) : accountNumber ? (
                <Button
                  className="w-40 cursor-default"
                  variant="purple"
                  hoverable={false}
                >
                  Hi there {isAdmin ? "Admin!" : null}
                </Button>
              ) : requireInstall ? (
                <Button
                  className="w-40"
                  variant="purple"
                  onClick={() =>
                    window.open("https://metamask.io/download.html", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              ) : (
                <Button className="w-40" variant="purple" onClick={connect}>
                  Connect
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {accountNumber && !pathname.includes("marketplace") ? (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {accountNumber}
          </div>
        </div>
      ) : null}
    </section>
  );
}
