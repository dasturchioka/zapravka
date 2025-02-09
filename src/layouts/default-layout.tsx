import React from "react";
import "@/assets/css/auth.css";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="default-layout">{children}</div>;
}
