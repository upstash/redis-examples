import { Breadcrumb, BreadcrumbProps } from "./Breadcrumb";
import StarButton from "./StarButton";
import React from "react";

export type HeaderProps = {
  breadcrumbOptions: BreadcrumbProps;
};

export default function Header({ breadcrumbOptions }: HeaderProps) {
  return (
    <header className="relative z-10 flex items-center py-4 px-6 shadow">
      <Breadcrumb {...breadcrumbOptions} />
      <div className="ml-auto hidden sm:block">
        <StarButton {...[...breadcrumbOptions?.data].pop()} />
      </div>
    </header>
  );
}
