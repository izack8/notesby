import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";
import { theme } from "./theme";

export const metadata: Metadata = {
  title: "notesby",
  description: "notesby",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body
        className="app-shell flex min-h-full flex-col"
        style={
          {
            "--theme-background": theme.colors.background,
            "--theme-foreground": theme.colors.foreground,
            "--theme-accent": theme.colors.accent,
            "--theme-font-family": theme.typography.fontFamily,
            "--theme-body-size": theme.typography.bodySize,
            "--theme-heading-size": theme.typography.headingSize,
            "--theme-page-padding": theme.spacing.pagePadding,
            "--theme-page-padding-wide": theme.spacing.pagePaddingWide,
          } as React.CSSProperties
        }
      >
        <h1 className="app-heading font-bold">NotesBy</h1>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
