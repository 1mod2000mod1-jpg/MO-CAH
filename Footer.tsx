import { Mail, MessageCircle, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">موني كاش</h3>
            <p className="text-gray-400">
              منصة استثمارية موثوقة لتنمية أموالك بطريقة آمنة ومضمونة
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-yellow-400 transition">الرئيسية</a></li>
              <li><a href="/packages" className="hover:text-yellow-400 transition">الباقات</a></li>
              <li><a href="/how-to-invest" className="hover:text-yellow-400 transition">كيف تستثمر</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition">اتصل بنا</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>support@moneycash.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-yellow-400" />
                <span>@moneycash_support</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span>+غير متوفر حاليا</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 موني كاش. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
