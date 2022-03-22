import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

const LINKS = [
    {
        href: '/marketplace',
        value: 'Buy'
    },
    {
        href: '/marketplace/courses/owned',
        value: 'My Courses'
    },
    {
        href: '/marketplace/courses/manage',
        value: 'Main Courses'
    }
];

const Header = () => {
  return (
    <>
      <WalletBar />
      <EthRates />
      <div className="flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </>
  );
};

export default Header;