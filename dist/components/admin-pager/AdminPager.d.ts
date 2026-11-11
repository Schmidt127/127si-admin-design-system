import type { ElementType } from "react";
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
export declare function AdminPager({ page, pageCount, hrefFor, total, noun, LinkComponent, className }: AdminPagerProps): import("react").JSX.Element | null;
