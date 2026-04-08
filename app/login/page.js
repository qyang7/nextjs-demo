import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function Login() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "登录", isLast: true }]} />
      <div style={{ padding: '24px' }}>
        <h1>登录</h1>
        <p>登录页面</p>
      </div>
    </>
  );
}
