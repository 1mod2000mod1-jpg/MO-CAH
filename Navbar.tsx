import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Wallet } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition">
            <Wallet className="w-8 h-8" />
            <span>موني كاش</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-yellow-300 transition">الرئيسية</Link>
            <Link to="/packages" className="hover:text-yellow-300 transition">الباقات</Link>
            <Link to="/how-to-invest" className="hover:text-yellow-300 transition">كيف تستثمر</Link>
            <Link to="/contact" className="hover:text-yellow-300 transition">اتصل بنا</Link>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  خروج
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">دخول</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    تسجيل
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
