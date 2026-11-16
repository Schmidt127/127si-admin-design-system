import type { ReactNode } from "react";
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
export declare function DataTableBanner({ eyebrow, title, lede, stats, titleId, className, children, }: DataTableBannerProps): import("react").JSX.Element;
