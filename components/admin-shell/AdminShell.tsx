import type { ReactNode } from "react";
import { platformLabel, type SiPlatform } from "../../brand/theme.js";
import { cx } from "../_shared/cx.js";

export type AdminNavItem = { href: string; label: string; icon?: ReactNode };

function labelFor(platform: string): string {
  return platformLabel(platform as SiPlatform) ?? "127SI ADMIN";
}

export type AdminSidebarProps = {
  platform?: string;
  navigation?: AdminNavItem[];
  activeHref?: string;
};

export function AdminSidebar({ platform = "content", navigation = [], activeHref }: AdminSidebarProps) {
  return (
    <aside className="si-admin-sidebar">
      <div className="si-admin-brand">
        <span className="si-admin-brand-mark">127</span>
        <span>Sports Intensity</span>
      </div>
      <div className="si-admin-platform-label">{labelFor(platform)}</div>
      <nav className="si-admin-nav" aria-label="Admin navigation">
        {navigation.map((item) => (
          <a
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
          </a>
        ))}
      </nav>
    </aside>
  );
}

export type AdminHeaderProps = {
  platform?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export function AdminHeader({ platform = "content", eyebrow = "Administrative workspace", actions, children }: AdminHeaderProps) {
  return (
    <header className="si-admin-header">
      <div>
        <div className="si-admin-eyebrow">{eyebrow}</div>
        <div className="si-admin-header-label">{labelFor(platform)}</div>
      </div>
      {children || (actions ? <div className="si-admin-header-actions">{actions}</div> : null)}
    </header>
  );
}

export type AdminShellProps = {
  platform?: string;
  navigation?: AdminNavItem[];
  activeHref?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AdminShell({ platform = "content", navigation = [], activeHref, children, footer, className }: AdminShellProps) {
  return (
    <div className={cx("si-admin-shell", className)} data-si-surface="admin">
      <AdminSidebar platform={platform} navigation={navigation} activeHref={activeHref} />
      <main className="si-admin-main">
        <AdminHeader platform={platform} />
        <div className="si-admin-content">{children}</div>
        {footer ? <footer className="si-admin-footer">{footer}</footer> : null}
      </main>
    </div>
  );
}
