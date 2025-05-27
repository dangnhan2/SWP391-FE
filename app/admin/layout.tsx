import { ReactNode } from "react";
import LayoutAdmin from "../components/Layout/LayoutAdmin";


export default function AdminLayout({ children }: { children: ReactNode }) {
  return <LayoutAdmin>{children}</LayoutAdmin>;
}