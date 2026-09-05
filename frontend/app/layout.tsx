import './static-globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Nexora — Multi-Agent AI Decision & Collaboration Platform',
  description: 'Four perspectives. One evidence-backed decision.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#090D16] text-gray-100 flex min-h-screen">
        <Sidebar />
        <main className="ml-64 flex-1 p-8 overflow-y-auto min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
