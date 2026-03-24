import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Building2, Briefcase, FolderKanban, GraduationCap, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ImageUploader from './ImageUploader';

const navItems = [
  { path: '/', label: 'หน้าหลัก', icon: Home },
  { path: '/company', label: 'ข้อมูลพื้นฐานหน่วยฝึกงาน', icon: Building2 },
  { path: '/tasks', label: 'หน้าที่/ภาระงานของนิสิต', icon: Briefcase },
  { path: '/projects', label: 'ผลงานระหว่างฝึกปฏิบัติงาน', icon: FolderKanban },
  { path: '/benefits', label: 'ประโยชน์ที่ได้รับ', icon: GraduationCap },
  { path: '/report', label: 'สารนิพนธ์', icon: FileText },
];

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                {/* BUU Logo */}
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                  <ImageUploader 
                    imageId="buuLogo" 
                    defaultImage="https://upload.wikimedia.org/wikipedia/th/thumb/a/a9/Burapha_University_Logo.svg/1200px-Burapha_University_Logo.svg.png"
                    alt="BUU Logo"
                  />
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:block">รายงานฝึกงาน</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-transparent'
                    } inline-flex items-center px-1 pt-1 text-sm font-medium h-full transition-colors`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${
                      isActive
                        ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700'
                        : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                    } block pl-3 pr-4 py-2 text-base font-medium flex items-center`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} รายงานผลการฝึกประสบการณ์วิชาชีพ - นายนันธภัทร กุมพันธ์
          </p>
        </div>
      </footer>
    </div>
  );
}
