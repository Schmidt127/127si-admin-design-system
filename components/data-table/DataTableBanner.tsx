import type { ReactNode } from "react";
import { cx } from "../_shared/cx.js";

export type DataTableStat = {
  id: string;
  label: string;
  value: number | string;
  /** Highlights the stat with the veteran gold treatment. */
  emphasis?: "gold";
};

export type DataTableBannerProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  stats?: DataTableStat[];
  titleId?: string;
  className?: string;
  children: ReactNode;
};

export function DataTableBanner({
  eyebrow,
  title,
  lede,
  stats = [],
  titleId = "si-dt-banner-title",
  className,
  children,
}: DataTableBannerProps) {
  return (
    <div className={cx("si-dt-directory", className)}>
      <header className="si-dt-directory__band" aria-labelledby={titleId}>
        <div className="si-dt-directory__band-copy">
          {eyebrow ? <p className="si-dt-directory__eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId} className="si-dt-directory__title">
            {title}
          </h2>
          {lede ? <p className="si-dt-directory__lede">{lede}</p> : null}
        </div>
        {stats.length ? (
          <ul className="si-dt-directory__stats" aria-label="Directory summary">
            {stats.map((stat) => (
              <li key={stat.id} className={cx("si-dt-directory__stat", stat.emphasis === "gold" && "si-dt-directory__stat--gold")}>
                <span className="si-dt-directory__stat-value">{stat.value}</span>
                <span className="si-dt-directory__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      {children}
    </div>
  );
}