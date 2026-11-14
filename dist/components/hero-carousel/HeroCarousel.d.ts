import { type ElementType, type ReactNode } from "react";
export type HeroSlide = {
    id: string;
    /** The photo. Leave it out for a slide that is the plain brand colour (use with a caption). */
    src?: string;
    /** Responsive candidates for `src`, e.g. from the app image optimiser (next/image `getImageProps`). */
    srcSet?: string;
    /** `sizes` for `srcSet`. Default "100vw". */
    sizes?: string;
    /** Smaller or taller crop for phones (below 768px). */
    srcMobile?: string;
    alt: string;
    /** One short line shown under the buttons while this slide is showing. */
    caption?: string;
    /** CSS object-position for the crop, e.g. "50% 30%". Default "center". */
    objectPosition?: string;
    /** "none" keeps this photo still (no slow zoom), for photos framed to an edge, e.g. heads at the top. */
    motion?: "auto" | "none";
    /**
     * Group photos that must keep every face in view on tall, narrow screens: the fraction (0 to 1) of the
     * photo's width that must stay visible. When the hero is too tall for that, the photo is shortened from
     * the top and its lower edge fades into the hero background. Assumes a 16:9 photo.
     */
    keepVisibleWidth?: number;
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
    /** Referee: blue wash from the left edge, transparent at 70% of the photo width. */
    washDirection?: "default" | "left";
    /** Seconds each slide shows. Default 7 (10 when the visitor prefers reduced motion). */
    intervalSeconds?: number;
    /** Names the carousel for screen readers. Default "Featured photos". */
    label?: string;
    LinkComponent?: ElementType;
    className?: string;
};
/** Full-bleed photo carousel with a headline and calls to action. */
export declare function HeroCarousel({ slides, eyebrow, headline, subhead, primaryCta, secondaryCta, children, aside, wash, washDirection, intervalSeconds, label, LinkComponent, className, }: HeroCarouselProps): import("react").JSX.Element;
