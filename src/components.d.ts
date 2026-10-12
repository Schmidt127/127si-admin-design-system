import type { ReactNode } from "react";

export function AdminShell(props: {
  platform?: string;
  navigation?: Array<{ href: string; label: string; icon?: ReactNode }>;
  activeHref?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}): ReactNode;

export function AdminHeader(props: {
  platform?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children?: ReactNode;
}): ReactNode;

export function AdminSidebar(props: {
  platform?: string;
  navigation?: Array<{ href: string; label: string; icon?: ReactNode }>;
  activeHref?: string;
}): ReactNode;

export function AdminPageHeader(props: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}): ReactNode;

export function AdminCard(props: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}): ReactNode;

export function AdminButton(props: {
  variant?: "primary" | "secondary" | "ghost";
  as?: string;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}): ReactNode;

export function AdminStatusBadge(props: { status?: string; children?: ReactNode }): ReactNode;

export function AdminTable(props: {
  columns?: Array<{ key: string; label: string; render?: (row: any) => ReactNode }>;
  rows?: any[];
  rowKey?: (row: any) => string | number;
  emptyMessage?: string;
}): ReactNode;
