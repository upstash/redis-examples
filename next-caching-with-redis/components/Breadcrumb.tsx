import Image from "next/image";
import React from "react";

export type BreadcrumbItemProps = {
  name: string;
  url: string;
};

export type BreadcrumbProps = {
  data: BreadcrumbItemProps[];
  showRoot?: boolean;
};

export function BreadcrumbDivider() {
  return <span className="text-gray-300">/</span>;
}

export function BreadcrumbItem({ url, name }: BreadcrumbItemProps) {
  return (
    <a
      className="cursor-pointer hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      href={url}
    >
      {name}
    </a>
  );
}

export function Breadcrumb({ data, showRoot = true }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Image src="/github.svg" alt="GitHub Logo" width={20} height={20} />

      {showRoot && (
        <>
          <span className="text-gray-300">/</span>

          <a
            className="cursor-pointer hover:underline"
            href="https://github.com/upstash"
            target="_blank"
            rel="noopener noreferrer"
          >
            upstash
          </a>
        </>
      )}

      {data.map((item) => {
        return (
          <>
            <BreadcrumbDivider />
            <BreadcrumbItem url={item.url} name={item.name} />
          </>
        );
      })}
    </div>
  );
}
