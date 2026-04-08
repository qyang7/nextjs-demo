import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function Management() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "管理", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>管理</h1>
        <p>管理页面</p>
      </div>
    </>
  );
}
