import { Metadata } from "next";
import DashboardViewer from "./dashboardViewer";

export const metadata: Metadata = {
  title: "ALP Bug Monitoring",
  description: "Bug Monitoring for ALP",
};

export const dynamic = "force-dynamic";

export default DashboardViewer;
