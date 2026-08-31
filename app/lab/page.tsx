import type { Metadata } from "next";
import "./route.css";

export const metadata: Metadata = {
  title: "神镜实验室 | HolyLens",
  description: "HolyLens 多模态身体信息采集技术地图。",
};

export default function LabPage() {
  return (
    <main className="lab-route-shell">
      <iframe
        className="lab-route-frame"
        src="/lab-static/index.html"
        title="神镜实验室"
      />
    </main>
  );
}
