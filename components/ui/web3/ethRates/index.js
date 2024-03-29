import Image from "next/image";
import { useEthPrice, COURSE_PRICE } from "@components/hooks";
import { Loader } from "@components/ui/common";

export default function EthRates() {
  const {
    eth: { data, pricePerItem },
  } = useEthPrice();

  return (
    <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md mr-2">
        <div className="flex items-center justify-center">
          {data ? (
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
                alt="loader"
              />
              <span className="text-xl font-bold">= {data}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Current eth Price</p>
      </div>
      <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {data ? (
            <>
              <span className="text-xl font-bold">{pricePerItem}</span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
                alt="loader"
              />
              <span className="text-xl font-bold">= {COURSE_PRICE}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
    </div>
  );
}
