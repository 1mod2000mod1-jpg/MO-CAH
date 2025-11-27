import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, DollarSign, Settings, CheckCircle, XCircle, Clock, Edit, Trash2, LineChart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [btcPrice, setBtcPrice] = useState(45000);
  const [priceHistory, setPriceHistory] = useState([]);

  // محاكاة سعر البتكوين ببطء
  useEffect(() => {
    const fetchRealBTCPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const realPrice = data.bitcoin.usd;
        setBtcPrice(realPrice);
        setPriceHistory(prev => [...prev.slice(-59), realPrice]);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };

    fetchRealBTCPrice();
    const interval = setInterval(fetchRealBTCPrice, 30000); // كل 30 ثانية

    return () => clearInterval(interval);
  }, []);

  // تحميل البيانات
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersResult = await window.storage.list('user:', true);
      const investmentsResult = await window.storage.list('investment:', true);
      
      if (usersResult?.keys) {
        const loadedUsers = [];
        for (const key of usersResult.keys) {
          const userData = await window.storage.get(key, true);
          if (userData) loadedUsers.push(JSON.parse(userData.value));
        }
        setUsers(loadedUsers);
      }

      if (investmentsResult?.keys) {
        const loadedInvestments = [];
        for (const key of investmentsResult.keys) {
          const invData = await window.storage.get(key, true);
          if (invData) loadedInvestments.push(JSON.parse(invData.value));
        }
        setInvestments(loadedInvestments);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const updateInvestmentStatus = async (investmentId, newStatus, multiplier, trades) => {
    try {
      const investment = investments.find(inv => inv.id === investmentId);
      if (!investment) return;

      const finalReturn = investment.amount * multiplier;
      const updatedInvestment = {
        ...investment,
        status: newStatus,
        actualReturn: finalReturn,
        multiplier: multiplier,
        trades: trades,
        completedAt: new Date().toISOString()
      };

      await window.storage.set(`investment:${investmentId}`, JSON.stringify(updatedInvestment), true);
      setInvestments(prev => prev.map(inv => inv.id === investmentId ? updatedInvestment : inv));
      setSelectedInvestment(null);
    } catch (error) {
      console.error('Error updating investment:', error);
    }
  };

  const deleteInvestment = async (investmentId) => {
    try {
      await window.storage.delete(`investment:${investmentId}`, true);
      setInvestments(prev => prev.filter(inv => inv.id !== investmentId));
    } catch (error) {
      console.error('Error deleting investment:', error);
    }
  };

  const approveInvestment = async (investmentId) => {
    try {
      const investment = investments.find(inv => inv.id === investmentId);
      if (!investment) return;

      const updatedInvestment = {
        ...investment,
        status: 'active',
        startDate: new Date().toISOString()
      };

      await window.storage.set(`investment:${investmentId}`, JSON.stringify(updatedInvestment), true);
      setInvestments(prev => prev.map(inv => inv.id === investmentId ? updatedInvestment : inv));
    } catch (error) {
      console.error('Error approving investment:', error);
    }
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const activeInvestments = investments.filter(inv => inv.status === 'active').length;
  const pendingInvestments = investments.filter(inv => inv.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">لوحة تحكم الأدمن</h1>
          <p className="text-gray-600">إدارة كاملة للمنصة والمستثمرين</p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12" />
                <div>
                  <p className="text-sm opacity-90">إجمالي المستخدمين</p>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <DollarSign className="w-12 h-12" />
                <div>
                  <p className="text-sm opacity-90">إجمالي الاستثمارات</p>
                  <p className="text-3xl font-bold">${totalInvested.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-12 h-12" />
                <div>
                  <p className="text-sm opacity-90">استثمارات نشطة</p>
                  <p className="text-3xl font-bold">{activeInvestments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Clock className="w-12 h-12" />
                <div>
                  <p className="text-sm opacity-90">قيد المراجعة</p>
                  <p className="text-3xl font-bold">{pendingInvestments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bitcoin Price Chart */}
        <Card className="mb-8 bg-black text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-6 h-6 text-orange-500" />
              سعر البتكوين المباشر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className="text-5xl font-bold text-orange-500">${btcPrice.toLocaleString()}</p>
              <p className="text-gray-400 mt-2">يتم التحديث كل 30 ثانية من CoinGecko API</p>
            </div>
            {priceHistory.length > 0 && (
              <div className="h-32 flex items-end gap-1">
                {priceHistory.map((price, idx) => {
                  const maxPrice = Math.max(...priceHistory);
                  const minPrice = Math.min(...priceHistory);
                  const height = ((price - minPrice) / (maxPrice - minPrice)) * 100;
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-orange-500 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="investments" className="w-full">
          <TabsList className="bg-purple-100">
            <TabsTrigger value="investments" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              الاستثمارات
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* إدارة الاستثمارات */}
          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الاستثمارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <Card key={investment.id} className="border-2 hover:border-purple-400 transition">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className={
                                investment.status === 'active' ? 'bg-blue-500' :
                                investment.status === 'completed' ? 'bg-green-500' :
                                investment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                              }>
                                {investment.status === 'active' ? 'نشط' :
                                 investment.status === 'completed' ? 'مكتمل' :
                                 investment.status === 'pending' ? 'قيد المراجعة' : 'ملغي'}
                              </Badge>
                              <span className="text-sm text-gray-500">ID: {investment.id}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">المبلغ</p>
                                <p className="text-xl font-bold text-purple-700">${investment.amount}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">العائد المتوقع</p>
                                <p className="text-xl font-bold text-green-600">${investment.expectedReturn}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">الباقة</p>
                                <p className="text-lg font-semibold">{investment.packageName || investment.packageId}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">تاريخ البدء</p>
                                <p className="text-sm">{new Date(investment.startDate).toLocaleDateString('ar-EG')}</p>
                              </div>
                            </div>

                            {investment.status === 'pending' && (
                              <Alert className="bg-yellow-50 border-yellow-500">
                                <AlertDescription className="text-yellow-800">
                                  يحتاج إلى موافقتك لتفعيل الاستثمار
                                </AlertDescription>
                              </Alert>
                            )}

                            {selectedInvestment?.id === investment.id && (
                              <div className="mt-4 p-4 bg-purple-50 rounded-lg space-y-4">
                                <h4 className="font-bold text-purple-900">تحديث حالة الاستثمار</h4>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>نوع الصفقة</Label>
                                    <Select defaultValue="single">
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="single">صفقة واحدة (سريع - مخاطرة قليلة)</SelectItem>
                                        <SelectItem value="multiple">عدة صفقات (آمن - بطيء)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label>نسبة المضاعفة</Label>
                                    <Input type="number" step="0.01" placeholder="1.6 = 60%" defaultValue="1.6" />
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button 
                                    onClick={() => updateInvestmentStatus(investment.id, 'completed', 1.6, 1)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    تأكيد ربح
                                  </Button>
                                  <Button 
                                    onClick={() => updateInvestmentStatus(investment.id, 'failed', 0, 1)}
                                    variant="destructive"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    تأكيد خسارة
                                  </Button>
                                  <Button 
                                    onClick={() => setSelectedInvestment(null)}
                                    variant="outline"
                                  >
                                    إلغاء
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {investment.status === 'pending' && (
                              <Button 
                                onClick={() => approveInvestment(investment.id)}
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            {investment.status === 'active' && (
                              <Button 
                                onClick={() => setSelectedInvestment(investment)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              onClick={() => deleteInvestment(investment.id)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* إدارة المستخدمين */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>جميع المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-bold text-lg">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">تاريخ التسجيل</p>
                        <p className="text-sm">{new Date(user.createdAt).toLocaleDateString('ar-EG')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الإعدادات */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  إعدادات المنصة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="bg-purple-50 border-purple-500">
                  <AlertDescription className="text-purple-900">
                    <strong>ملاحظة:</strong> يتم تحديث سعر البتكوين تلقائياً كل 30 ثانية من API CoinGecko
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
