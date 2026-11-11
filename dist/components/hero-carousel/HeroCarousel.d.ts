import { type ElementType, type ReactNode } from "react";
export type HeroSlide = {
    id: string;
    src: string;
    /** Responsive candidates for `src`, e.g. from the app image optimiser (next/image `getImageProps`). */
    srcSet?: string;
    /** `sizes` for `srcSet`. Default "100vw". */
    sizes?: string;
    /** Smaller or taller crop for phones (below 768px). */
    srcMobile?: string;
    alt: string;
    /** CSS object-position for the crop, e.g. "50% 30%". Default "center". */
    objectPosition?: string;
};
export type HeroCarouselProps = {
    slides: HeroSlide[];
    eyebrow?: string;
    headline: ReactNode;
    subhead?: string;
    primaryCta?: {
        href: string;
        label: string;
    };
    secondaryCta?: {
        href: string;
        label: string;
    };
    /** Extra content under the buttons, owned by the app (for example a "choose your challenge" list). */
    children?: ReactNode;
    /** Compact card beside the copy on wide screens. */
    aside?: ReactNode;
    /**
     * Dark-to-brand colour wash over the photos, for text legibility. Default true.
     * Team Shot Tracker sets false (owner decision 2026-11-09) and relies on the text shadow.
     */
    wash?: boolean;
    /** Seconds each slide shows. Default 7 (10 when the visitor prefers reduced motion). */
    intervalSeconds?: number;
    /** Names the carousel for screen readers. Default "Featured photos". */
    label?: string;
    LinkComponent?: ElementType;
    className?: string;
};
/** Full-bleed photo carousel with a headline and calls to action. */
export declare function HeroCarousel({ slides, eyebrow, headline, subhead, primaryCta, secondaryCta, children, aside, wash, intervalSeconds, label, LinkComponent, className, }: HeroCarouselProps): import("react").JSX.Element;
