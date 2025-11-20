import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  color: string;
}

export default function StatsCard({ icon: Icon, title, value, color }: StatsCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full ${color}`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
