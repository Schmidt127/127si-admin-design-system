import React from "react";

const cx = (...values) => values.filter(Boolean).join(" ");

export function AdminShell({ platform = "content", navigation = [], activeHref, children, footer, className }) {
  return React.createElement(
    "div",
    { className: cx("si-admin-shell", className) },
    React.createElement(AdminSidebar, { platform, navigation, activeHref }),
    React.createElement("main", { className: "si-admin-main" },
      React.createElement(AdminHeader, { platform }),
      React.createElement("div", { className: "si-admin-content" }, children),
      footer ? React.createElement("footer", { className: "si-admin-footer" }, footer) : null
    )
  );
}

export function AdminSidebar({ platform = "content", navigation = [], activeHref }) {
  return React.createElement("aside", { className: "si-admin-sidebar" },
    React.createElement("div", { className: "si-admin-brand" },
      React.createElement("span", { className: "si-admin-brand-mark" }, "127"),
      React.createElement("span", null, "Sports Intensity")
    ),
    React.createElement("div", { className: "si-admin-platform-label" }, platformLabel(platform)),
    React.createElement("nav", { className: "si-admin-nav", "aria-label": "Admin navigation" },
      navigation.map((item) => React.createElement("a", {
        key: item.href || item.label,
        href: item.href,
        className: cx("si-admin-nav-link", activeHref === item.href && "is-active"),
        "aria-current": activeHref === item.href ? "page" : undefined,
      }, item.icon ? React.createElement("span", { className: "si-admin-nav-icon", "aria-hidden": true }, item.icon) : null, item.label))
    )
  );
}

export function AdminHeader({ platform = "content", eyebrow = "Administrative workspace", actions, children }) {
  return React.createElement("header", { className: "si-admin-header" },
    React.createElement("div", null,
      React.createElement("div", { className: "si-admin-eyebrow" }, eyebrow),
      React.createElement("div", { className: "si-admin-header-label" }, platformLabel(platform))
    ),
    children || (actions ? React.createElement("div", { className: "si-admin-header-actions" }, actions) : null)
  );
}

export function AdminPageHeader({ title, description, actions, eyebrow }) {
  return React.createElement("div", { className: "si-admin-page-header" },
    React.createElement("div", null,
      eyebrow ? React.createElement("div", { className: "si-admin-eyebrow" }, eyebrow) : null,
      React.createElement("h1", null, title),
      description ? React.createElement("p", null, description) : null
    ),
    actions ? React.createElement("div", { className: "si-admin-page-actions" }, actions) : null
  );
}

export function AdminCard({ title, description, actions, children, className }) {
  return React.createElement("section", { className: cx("si-admin-card", className) },
    title || actions ? React.createElement("div", { className: "si-admin-card-header" },
      React.createElement("div", null, title ? React.createElement("h2", null, title) : null, description ? React.createElement("p", null, description) : null),
      actions ? React.createElement("div", { className: "si-admin-card-actions" }, actions) : null
    ) : null,
    React.createElement("div", { className: "si-admin-card-body" }, children)
  );
}

export function AdminButton({ variant = "primary", as: Component = "button", className, children, ...props }) {
  return React.createElement(Component, { className: cx("si-admin-button", `is-${variant}`, className), ...props }, children);
}

export function AdminStatusBadge({ status, children }) {
  const value = String(status || children || "").toLowerCase().replace(/\s+/g, "-");
  return React.createElement("span", { className: cx("si-admin-status", `is-${value}`) }, children || status);
}

export function AdminTable({ columns = [], rows = [], rowKey, emptyMessage = "No records found." }) {
  return React.createElement("div", { className: "si-admin-table-wrap" },
    React.createElement("table", { className: "si-admin-table" },
      React.createElement("thead", null, React.createElement("tr", null, columns.map((column) => React.createElement("th", { key: column.key }, column.label)))),
      React.createElement("tbody", null,
        rows.length ? rows.map((row, index) => React.createElement("tr", { key: rowKey ? rowKey(row) : index }, columns.map((column) => React.createElement("td", { key: column.key }, column.render ? column.render(row) : row[column.key])))) :
          React.createElement("tr", null, React.createElement("td", { colSpan: columns.length || 1, className: "si-admin-empty" }, emptyMessage))
      )
    )
  );
}
