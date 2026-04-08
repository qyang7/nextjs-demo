import SetBreadcrumb from "@/components/SetBreadcrumb";

export default function NotFound() {
  return (
    <>
      <SetBreadcrumb items={[{ label: "404", isLast: true }]} />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'calc(100vh - 44px)',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
        <p style={{ fontSize: '1.5rem', color: '#666' }}>页面未找到</p>
      </div>
    </>
  );
}
