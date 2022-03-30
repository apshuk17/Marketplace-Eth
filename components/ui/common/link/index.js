import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ActiveLink = ({ children, activeLinkClass, ...otherProps }) => {
  const { pathname } = useRouter();
  let className = children.props.className || "";

  if (pathname === "/") console.log("##activeLinkClass Out", activeLinkClass);

  if (pathname === otherProps.href) {
    if (pathname === "/") console.log("##activeLinkClass", activeLinkClass);
    className = `${className} ${
      activeLinkClass ? activeLinkClass : "text-indigo-600"
    }`;
  }
  return (
    <Link {...otherProps}>{React.cloneElement(children, { className })}</Link>
  );
};

export default ActiveLink;
