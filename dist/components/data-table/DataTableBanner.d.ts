import type { ReactNode } from "react";
export type DataTableStat = {
    id: string;
    label: string;
    value: number | string;
    /** Highlights the stat with the veteran gold treatment. */
    emphasis?: "gold";
};
export type DataTableBannerTitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type DataTableBannerProps = {
    eyebrow?: string;
    title: string;
    lede?: string;
    stats?: DataTableStat[];
    titleId?: string;
    /** Use `1` when the banner is the page’s sole primary heading (e.g. Referee /youth-participants). */
    titleLevel?: DataTableBannerTitleLevel;
    className?: string;
    children: ReactNode;
};
export declare function DataTableBanner({ eyebrow, title, lede, stats, titleId, titleLevel, className, children, }: DataTableBannerProps): import("react").JSX.Element;
