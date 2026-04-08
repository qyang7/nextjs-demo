import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function Detail() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "详情", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>详情</h1>
        <p>详情页面</p>
      </div>
    </>
  );
}
