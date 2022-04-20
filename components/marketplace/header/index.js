import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

const LINKS = [
    {
        href: '/marketplace',
        value: 'Buy',
        requireAdmin: false
    },
    {
        href: '/marketplace/courses/owned',
        value: 'My Courses',
        requireAdmin: false
    },
    {
        href: '/marketplace/courses/managed',
        value: 'Manage Courses',
        requireAdmin: true
    }
];

const Header = ({ isAdmin }) => {
  return (
    <>
    <div className="pt-4">
      <WalletBar />
    </div>
    <EthRates />
    <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
      <Breadcrumbs isAdmin={isAdmin} items={LINKS} />
    </div>
  </>
  );
};

export default Header;
