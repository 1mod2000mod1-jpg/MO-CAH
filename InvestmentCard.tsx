import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Investment } from '@/types';
import { PACKAGES } from '@/types';
import { Calendar, DollarSign, TrendingUp } from 'lucide-react';

interface InvestmentCardProps {
  investment: Investment;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  const pkg = PACKAGES.find(p => p.id === investment.packageId);
  const daysLeft = Math.ceil((new Date(investment.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'pending': return 'قيد المراجعة';
      default: return status;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className={`bg-gradient-to-r ${pkg?.color} text-white`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{pkg?.icon} {pkg?.name}</CardTitle>
          <Badge className={getStatusColor(investment.status)}>
            {getStatusText(investment.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">المبلغ المستثمر</p>
              <p className="font-bold text-lg">${investment.amount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">العائد المتوقع</p>
              <p className="font-bold text-lg text-green-600">${investment.expectedReturn}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">
              {investment.status === 'active' && daysLeft > 0 ? `متبقي ${daysLeft} يوم` : 'تاريخ الانتهاء'}
            </p>
            <p className="font-semibold">{new Date(investment.endDate).toLocaleDateString('ar-EG')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
