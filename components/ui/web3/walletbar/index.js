import { useWeb3 } from "@components/providers";

export default function WalletBar({
  address,
  network,
  targetNetwork,
  isSupported,
  hasInitialResponse,
}) {
  const { requireInstall } = useWeb3();
  return (
    <section className="text-white bg-indigo-600">
      <div className="p-8">
        <h1 className="text-2xl">Hello, {address}</h1>
        <h2 className="subtitle mb-5 text-xl">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Learn how to purchase
              </a>
            </div>
          </div>
          <div>
            {!isSupported && hasInitialResponse ? (
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Connected to wrong network!</div>
                <div>
                  Connect to:{" "}
                  <strong className="text-2xl">{targetNetwork}</strong>
                </div>
              </div>
            ) : null}
            {requireInstall ? (
              <div className="bg-yellow-500 p-4 rounded-lg">
                Cannot connect to network. Please install Metamask.
              </div>
            ) : null}
            {network ? (
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{network}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
