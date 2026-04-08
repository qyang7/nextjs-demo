import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function User() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "用户管理", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>用户管理</h1>
        <p>用户列表</p>
      </div>
    </>
  );
}
