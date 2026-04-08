import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function Order() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "订单", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>订单</h1>
        <p>订单页面</p>
      </div>
    </>
  );
}
