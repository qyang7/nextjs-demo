import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function Register() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "注册", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>注册</h1>
        <p>注册页面</p>
      </div>
    </>
  );
}
