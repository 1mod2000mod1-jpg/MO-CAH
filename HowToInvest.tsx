import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Package, Wallet, TrendingUp, CheckCircle } from 'lucide-react';

export default function HowToInvest() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: UserPlus,
      title: '1. إنشاء حساب',
      description: 'سجل في موني كاش بإدخال بياناتك الأساسية. العملية تستغرق أقل من دقيقة.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Package,
      title: '2. اختيار الباقة',
      description: 'اختر الباقة المناسبة لك من بين 4 باقات تبدأ من 10$ فقط.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Wallet,
      title: '3. الإيداع عبر Binance',
      description: 'حول المبلغ عبر Binance إلى عنوان المحفظة أو Binance Pay ID المعروض.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: '4. التأكيد والمراجعة',
      description: 'بعد التحويل، أكد الإيداع وسنراجع طلبك خلال 24 ساعة.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: TrendingUp,
      title: '5. استلام الأرباح',
      description: 'بعد انتهاء مدة الاستثمار، استلم أموالك مع الأرباح مباشرة.',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">كيف تستثمر في موني كاش؟</h1>
          <p className="text-xl text-gray-600">خطوات بسيطة لبدء رحلتك الاستثمارية</p>
        </div>

        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`bg-gradient-to-br ${step.color} p-4 rounded-full flex-shrink-0`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-700 text-lg">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للبدء؟</h2>
            <p className="text-xl mb-6">انضم إلى آلاف المستثمرين الناجحين اليوم</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              >
                سجل الآن
              </Button>
              <Button 
                onClick={() => navigate('/packages')}
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white"
              >
                اطلع على الباقات
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-900">💡 معلومة</h3>
              <p className="text-blue-800">
                نحن شركة ناشئة المستثمرين يتم إستقابلهم على دفعات متتالية وليس دفعة واحدة لضمان أكثر للمستثمرين
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-900">🔒 أمان</h3>
              <p className="text-green-800">
                جميع المعاملات مشفرة وآمنة. نحن نستخدم أحدث تقنيات الأمان لحماية أموالك.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
