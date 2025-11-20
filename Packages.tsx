import PackageCard from '@/components/PackageCard';
import { PACKAGES } from '@/types';

export default function Packages() {
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">باقات الاستثمار</h1>
          <p className="text-xl text-gray-600">اختر الباقة المناسبة لك وابدأ رحلتك الاستثمارية</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-blue-900">💡 نصيحة استثمارية</h3>
          <p className="text-blue-800">
            يمكنك البدء بالباقة المبتدئ لتجربة المنصة، ثم الترقية إلى الباقات الأعلى للحصول على عوائد أكبر.
            جميع الباقات مضمونة وآمنة 100%.
          </p>
        </div>
      </div>
    </div>
  );
}
