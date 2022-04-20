import { ActiveLink } from "@components/ui/common";

const BreadcrumbItem = ({ href, index, value }) => {
  return (
    <li
      key={href}
      className={`${
        index === 0 ? "pr-4" : "px-4"
      } font-medium text-gray-500 hover:text-gray-900`}
    >
      <ActiveLink href={href}>
        <a>{value}</a>
      </ActiveLink>
    </li>
  );
};

export default function Breadcrumbs({ items, isAdmin }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map(({ href, value, requireAdmin }, index) => {
          return !isAdmin ? (
            !requireAdmin ? (
              <BreadcrumbItem key={href} href={href} value={value} index={index} />
            ) : null
          ) : (
            <BreadcrumbItem key={href} href={href} value={value} index={index} />
          );
        })}
      </ol>
    </nav>
  );
}
