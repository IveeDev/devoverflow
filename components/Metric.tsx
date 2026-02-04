import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string | null;
  imgStyles?: string;
  isAuthor?: boolean;
  textStyles: string;
  titleStyles?: string;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  imgStyles,
  href,
  isAuthor,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={cn("rounded-full object-contain", imgStyles)}
      />
      <p className={cn(textStyles, "flex items-center gap-1")}>
        {value}
        <span
          className={cn(
            "small-medium line-clamp-1",
            isAuthor ? "max-sm:hidden" : ""
          )}
        >
          {title}
        </span>
      </p>
    </>
  );

  const containerClasses = "flex-center gap-1"; // Common classes

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {metricContent}
      </Link>
    );
  }

  return <div className={containerClasses}>{metricContent}</div>;
};

export default Metric;
