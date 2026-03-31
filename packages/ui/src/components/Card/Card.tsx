import * as React from "react";
import clsx from "clsx";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
};

export function Card({ title, className, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-md border border-border bg-background text-foreground",
        className
      )}
    >
      {title ? (
        <div className="border-b border-border px-4 py-2 text-sm font-semibold">
          {title}
        </div>
      ) : null}
      {children ? <div className="p-4">{children}</div> : null}
    </div>
  );
}

