import type { ElementType } from "react";
import { cx } from "../_shared/cx.js";

export type AdminPagerProps = {
  page: number;
  pageCount: number;
  /** Builds the link for a page number, for example (p) => `/admin/people?page=${p}`. */
  hrefFor: (page: number) => string;
  /** Total rows, shown as "128 records". */
  total?: number;
  /** Singular noun for the total. Default "record". */
  noun?: string;
  LinkComponent?: ElementType;
  className?: string;
};

/** Previous / next links with "Page 2 of 7". Renders nothing when there is only one page. */
export function AdminPager({ page, pageCount, hrefFor, total, noun = "record", LinkComponent, className }: AdminPagerProps) {
  if (pageCount <= 1) return null;
  const Link: ElementType = LinkComponent ?? "a";
  const current = Math.min(Math.max(page, 1), pageCount);
  return (
    <nav className={cx("si-admin-pager", className)} aria-label="Pages">
      {current > 1 ? (
        <Link className="si-admin-pager-link" href={hrefFor(current - 1)} rel="prev">
          Previous
        </Link>
      ) : (
        <span className="si-admin-pager-link is-disabled" aria-disabled="true">
          Previous
        </span>
      )}
      <span className="si-admin-pager-status" aria-current="page">
        Page {current} of {pageCount}
        {typeof total === "number" ? ` (${total} ${total === 1 ? noun : `${noun}s`})` : ""}
      </span>
      {current < pageCount ? (
        <Link className="si-admin-pager-link" href={hrefFor(current + 1)} rel="next">
          Next
        </Link>
      ) : (
        <span className="si-admin-pager-link is-disabled" aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
