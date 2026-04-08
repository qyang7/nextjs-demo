import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function Dashboard() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "仪表盘", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>仪表盘</h1>
        <p>欢迎使用仪表盘</p>
      </div>
    </>
  );
}
