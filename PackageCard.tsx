import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from '@/types';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleInvest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/deposit', { state: { package: pkg } });
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-green-500">
      <CardHeader className={`bg-gradient-to-br ${pkg.color} text-white rounded-t-lg`}>
        <div className="text-center">
          <div className="text-6xl mb-4">{pkg.icon}</div>
          <CardTitle className="text-3xl font-bold">{pkg.name}</CardTitle>
          <CardDescription className="text-white/90 text-lg mt-2">
            {pkg.nameEn} Package
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">الحد الأدنى للاستثمار</p>
          <p className="text-4xl font-bold text-green-600">${pkg.minAmount}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">عائد <span className="font-bold text-green-600">{pkg.returnRate}%</span></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">مدة الاستثمار <span className="font-bold">{pkg.duration} يوم</span></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">دفع عبر Binance</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">سحب الأرباح فوري</span>
          </div>
        </div>

        <Button 
          onClick={handleInvest}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 text-lg"
        >
          استثمر الآن
        </Button>
      </CardContent>
    </Card>
  );
}
