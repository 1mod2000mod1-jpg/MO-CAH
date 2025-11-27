import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InvestmentCard from '@/components/InvestmentCard';
import { DollarSign, TrendingUp, Wallet, Plus } from 'lucide-react';

export default function Dashboard() {
  const { user, investments } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalExpectedReturn = investments.reduce((sum, inv) => sum + inv.expectedReturn, 0);
  const activeInvestments = investments.filter(inv => inv.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">مرحباً، {user.name}! 👋</h1>
          <p className="text-gray-600">إليك ملخص استثماراتك</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                إجمالي المستثمر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${totalInvested.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                العوائد المتوقعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${totalExpectedReturn.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                استثمارات نشطة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{activeInvestments}</p>
            </CardContent>
          </Card>
        </div>

        {/* Investments Section */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold">استثماراتي</h2>
          <Button 
            onClick={() => navigate('/packages')}
            className="bg-green-600 hover:bg-purple-700 gap-2"
          >
            <Plus className="w-5 h-5" />
            استثمار جديد
          </Button>
        </div>

        {investments.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-2">لا توجد استثمارات بعد</h3>
              <p className="text-gray-600 mb-6">ابدأ رحلتك الاستثمارية الآن</p>
              <Button 
                onClick={() => navigate('/packages')}
                className="bg-purple-600 hover:bg-purple-600"
              >
                اختر باقة الاستثمار
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
