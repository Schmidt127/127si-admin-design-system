import type { ElementType, ReactNode } from "react";
import { platformLabel, type SiPlatform } from "../../brand/theme.js";
import { cx } from "../_shared/cx.js";

export type AdminNavItem = {
  href: string;
  label: string;
  icon?: ReactNode;
  /** Plain <a> even when a LinkComponent is given (downloads, API routes, other sites). */
  external?: boolean;
};

function labelFor(platform: string): string {
  return platformLabel(platform as SiPlatform) ?? "127SI ADMIN";
}

export type AdminSidebarProps = {
  platform?: string;
  navigation?: AdminNavItem[];
  activeHref?: string;
  /** White 127 SI logo (`@127si/design-system/assets/logos/logo-white.png`). Without it a text mark is shown. */
  logoSrc?: string;
  /** Where the logo links to. Default "/admin". */
  homeHref?: string;
  /** The app's router link (next/link). Internal nav items and the logo use it. */
  LinkComponent?: ElementType;
  /** Small print at the bottom of the sidebar: who is signed in, sign out, link to the public site. */
  sidebarFooter?: ReactNode;
};

export function AdminSidebar({
  platform = "content",
  navigation = [],
  activeHref,
  logoSrc,
  homeHref = "/admin",
  LinkComponent,
  sidebarFooter,
}: AdminSidebarProps) {
  const Link: ElementType = LinkComponent ?? "a";
  return (
    <aside className="si-admin-sidebar">
      {logoSrc ? (
        <Link href={homeHref} className="si-admin-brand si-admin-brand--logo">
          <img className="si-admin-brand-image" src={logoSrc} alt="127 Sports Intensity" width={180} height={29} />
        </Link>
      ) : (
        <div className="si-admin-brand">
          <span className="si-admin-brand-mark">127</span>
          <span>Sports Intensity</span>
        </div>
      )}
      <div className="si-admin-platform-label">{labelFor(platform)}</div>
      <nav className="si-admin-nav" aria-label="Admin navigation">
        {navigation.map((item) => {
          const Item: ElementType = item.external ? "a" : Link;
          return (
            <Item
              key={item.href || item.label}
              href={item.href}
              className={cx("si-admin-nav-link", activeHref === item.href && "is-active")}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.icon ? (
                <span className="si-admin-nav-icon" aria-hidden>
                  {item.icon}
                </span>
              ) : null}
              {item.label}
            </Item>
          );
        })}
      </nav>
      {sidebarFooter ? <div className="si-admin-sidebar-footer">{sidebarFooter}</div> : null}
    </aside>
  );
}

export type AdminHeaderProps = {
  platform?: string;
  eyebrow?: string;
  /** Replaces the platform label in the header, for example "Operations workspace". */
  title?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export function AdminHeader({ platform = "content", eyebrow = "Administrative workspace", title, actions, children }: AdminHeaderProps) {
  return (
    <header className="si-admin-header">
      <div>
        <div className="si-admin-eyebrow">{eyebrow}</div>
        <div className="si-admin-header-label">{title ?? labelFor(platform)}</div>
      </div>
      {children || (actions ? <div className="si-admin-header-actions">{actions}</div> : null)}
    </header>
  );
}

export type AdminShellProps = AdminSidebarProps & {
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerEyebrow?: string;
  headerTitle?: string;
  /** Right side of the header: environment chip, account, sign out. */
  headerActions?: ReactNode;
  /** id on the content area, for a "skip to content" link. It is made focusable. */
  contentId?: string;
};

export function AdminShell({
  platform = "content",
  navigation = [],
  activeHref,
  logoSrc,
  homeHref,
  LinkComponent,
  sidebarFooter,
  children,
  footer,
  className,
  headerEyebrow,
  headerTitle,
  headerActions,
  contentId,
}: AdminShellProps) {
  return (
    <div className={cx("si-admin-shell", className)} data-si-surface="admin">
      <AdminSidebar
        platform={platform}
        navigation={navigation}
        activeHref={activeHref}
        logoSrc={logoSrc}
        homeHref={homeHref}
        LinkComponent={LinkComponent}
        sidebarFooter={sidebarFooter}
      />
      <main className="si-admin-main">
        <AdminHeader platform={platform} eyebrow={headerEyebrow} title={headerTitle} actions={headerActions} />
        <div className="si-admin-content" id={contentId} tabIndex={contentId ? -1 : undefined}>
          {children}
        </div>
        {footer ? <footer className="si-admin-footer">{footer}</footer> : null}
      </main>
    </div>
  );
}
