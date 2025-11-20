import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Package } from '@/types';
import { toast } from 'sonner';
import { Copy, CheckCircle2 } from 'lucide-react';

export default function Deposit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addInvestment, user } = useAuth();
  const pkg = location.state?.package as Package;
  const [amount, setAmount] = useState(pkg?.minAmount.toString() || '');
  const [copied, setCopied] = useState(false);

  // معلومات Binance - يجب تحديثها بمعلوماتك الحقيقية
  const BINANCE_WALLET = 'YOUR_BINANCE_WALLET_ADDRESS_HERE';
  const BINANCE_PAY_ID = 'YOUR_BINANCE_PAY_ID_HERE';

  if (!pkg || !user) {
    navigate('/packages');
    return null;
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('تم النسخ!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const investAmount = parseFloat(amount);
    if (investAmount < pkg.minAmount) {
      toast.error(`الحد الأدنى للاستثمار هو $${pkg.minAmount}`);
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + pkg.duration);

    const expectedReturn = investAmount + (investAmount * pkg.returnRate / 100);

    addInvestment({
      packageId: pkg.id,
      amount: investAmount,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'pending',
      expectedReturn
    });

    toast.success('تم إرسال طلب الاستثمار! سيتم مراجعته قريباً');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">إيداع استثمار جديد</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Package Info */}
          <Card className={`bg-gradient-to-br ${pkg.color} text-white`}>
            <CardHeader>
              <div className="text-6xl mb-4 text-center">{pkg.icon}</div>
              <CardTitle className="text-3xl text-center">{pkg.name}</CardTitle>
              <CardDescription className="text-white/90 text-center text-lg">
                {pkg.nameEn} Package
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="text-sm">الحد الأدنى</p>
                <p className="text-3xl font-bold">${pkg.minAmount}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>العائد:</span>
                  <span className="font-bold">{pkg.returnRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>المدة:</span>
                  <span className="font-bold">{pkg.duration} يوم</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deposit Form */}
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الإيداع</CardTitle>
              <CardDescription>أدخل المبلغ وأكمل التحويل</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="amount">المبلغ (بالدولار)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min={pkg.minAmount}
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="mt-1 text-lg"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    العائد المتوقع: ${(parseFloat(amount || '0') * (1 + pkg.returnRate / 100)).toFixed(2)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-bold text-blue-900">معلومات التحويل</h4>
                  
                  <div>
                    <Label className="text-sm text-gray-700">عنوان المحفظة (USDT)</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        value={BINANCE_WALLET} 
                        readOnly 
                        className="bg-white text-xs"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(BINANCE_WALLET)}
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">Binance Pay ID</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        value={BINANCE_PAY_ID} 
                        readOnly 
                        className="bg-white"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(BINANCE_PAY_ID)}
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="text-sm text-yellow-800">
                    ⚠️ بعد إتمام التحويل، اضغط على "تأكيد الإيداع" وسيتم مراجعة طلبك خلال 24 ساعة
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6"
                >
                  تأكيد الإيداع
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
