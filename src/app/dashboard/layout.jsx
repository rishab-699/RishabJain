import Sidebar from './components/sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-screen overflow-hidden">
      <aside className="w-64 bg-white shrink-0">
        <div className="p-4 w-full text-center text-2xl tracking-wide border-b-2 font-bold">
          dashboard
        </div>
        <Sidebar/>
        </aside>
      <main className="w-[calc(100vw-25%)] overflow-x-hidden">{children}</main>
    </div>
  );
}