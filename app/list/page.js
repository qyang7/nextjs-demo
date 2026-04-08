import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function List() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "列表", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>列表</h1>
        <p>列表页面</p>
      </div>
    </>
  );
}
