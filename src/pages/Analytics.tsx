import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Target,
  AlertCircle,
  Info,
  ExternalLink,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fullYearData = [
  { month: 'Jan', spending: 45000, earnings: 65000 },
  { month: 'Feb', spending: 52000, earnings: 58000 },
  { month: 'Mar', spending: 38000, earnings: 72000 },
  { month: 'Apr', spending: 47000, earnings: 69000 },
  { month: 'May', spending: 55000, earnings: 48000 },
  { month: 'Jun', spending: 41000, earnings: 78000 },
  { month: 'Jul', spending: 46000, earnings: 72000 },
  { month: 'Aug', spending: 48000, earnings: 75000 },
  { month: 'Sep', spending: 53000, earnings: 78000 },
  { month: 'Oct', spending: 49000, earnings: 70000 },
  { month: 'Nov', spending: 47000, earnings: 68000 },
  { month: 'Dec', spending: 52000, earnings: 73000 },
];

const initialExpenseBreakdown = [
  { name: 'Seeds & Fertilizers', amount: 85000 },
  { name: 'Equipment Rental', amount: 60000 },
  { name: 'Labor', amount: 48000 },
  { name: 'Irrigation', amount: 29000 },
  { name: 'Others', amount: 19000 },
];

const periodMonthsMap = {
  '3months': 3,
  '6months': 6,
  '1year': 12,
};

const COLORS = ['hsl(var(--primary))', 'hsl(var(--farming-leaf))', 'hsl(var(--warning))', 'hsl(var(--success))', 'hsl(var(--muted))'];

const Analytics = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Monthly earning/spending with profit per month
  const [monthlyData, setMonthlyData] = useState(() => {
    return fullYearData.slice(0, periodMonthsMap['6months']).map(m => ({
      ...m,
      profit: m.earnings - m.spending,
    }));
  });

  // Editable expense categories with amounts
  const [expenseBreakdown, setExpenseBreakdown] = useState(() => {
    const total = initialExpenseBreakdown.reduce((sum, i) => sum + i.amount, 0);
    return initialExpenseBreakdown.map(item => ({
      ...item,
      value: (item.amount / total) * 100,
    }));
  });

  // Add new expense inputs
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  // Update monthly data on period change
  useEffect(() => {
    const monthsCount = periodMonthsMap[selectedPeriod];
    const slicedData = fullYearData.slice(0, monthsCount).map(m => ({
      ...m,
      profit: m.earnings - m.spending,
    }));
    setMonthlyData(slicedData);
  }, [selectedPeriod]);

  // Handle editable spending and earnings change for monthlyData
  const handleMonthlyValueChange = (index, field, value) => {
    const numValue = parseInt(value) || 0;
    setMonthlyData(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: numValue,
        profit: field === 'spending' ? copy[index].earnings - numValue : numValue - copy[index].spending,
      };
      return copy;
    });
  };

  // Handle editable expense category amount change
  const handleExpenseAmountChange = (index, value) => {
    const numValue = parseInt(value) || 0;
    setExpenseBreakdown(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        amount: numValue,
      };
      // Recalculate value % based on updated total
      const totalAmt = copy.reduce((sum, i) => sum + i.amount, 0) || 1;
      return copy.map(i => ({
        ...i,
        value: (i.amount / totalAmt) * 100,
      }));
    });
  };

  // Add new expense category
  const handleAddExpense = () => {
    if (!newExpenseName.trim()) return;
    const amountNum = parseInt(newExpenseAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setExpenseBreakdown(prev => {
      const newList = [...prev, { name: newExpenseName.trim(), amount: amountNum, value: 0 }];
      const totalAmt = newList.reduce((sum, i) => sum + i.amount, 0);
      return newList.map(i => ({ ...i, value: (i.amount / totalAmt) * 100 }));
    });
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  // Calculate total spending: sum of selected months + sum of expense categories
  const totalSpendingOnMonths = monthlyData.reduce((sum, item) => sum + item.spending, 0);
  const totalExpenseAmount = expenseBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const totalSpending = totalSpendingOnMonths + totalExpenseAmount;

  // Similarly total earnings and profit margin
  const totalEarnings = monthlyData.reduce((sum, item) => sum + item.earnings, 0);
  const totalProfit = totalEarnings - totalSpending;
  const profitMargin = totalEarnings ? ((totalProfit / totalEarnings) * 100).toFixed(1) : '0.0';

  // Government schemes & investments (same logic as before)
  const governmentSchemes = [
    {
      id: 1,
      name: 'PM-KISAN Scheme',
      description: 'Direct income support of ₹6,000 per year to farmer families',
      eligibility: 'Small & marginal farmers',
      type: 'Financial Support',
      applicable: totalProfit > 0 ? 'Always Applicable' : 'Especially Beneficial',
      link: 'https://pmkisan.gov.in'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme for financial support against crop loss',
      eligibility: 'All farmers',
      type: 'Insurance',
      applicable: 'Recommended for Risk Management',
      link: 'https://pmfby.gov.in'
    },
    {
      id: 3,
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and recommendations for balanced fertilization',
      eligibility: 'All farmers',
      type: 'Advisory',
      applicable: 'Cost Reduction Strategy',
      link: 'https://soilhealth.dac.gov.in'
    },
    {
      id: 4,
      name: 'Kisan Credit Card',
      description: 'Easy access to credit for agricultural needs',
      eligibility: 'All farmers',
      type: 'Credit',
      applicable: totalProfit < 0 ? 'Immediate Need' : 'Expansion Capital',
      link: 'https://www.nabard.org'
    }
  ];

  const investmentOptions = [
    {
      name: 'Drip Irrigation System',
      cost: '₹1,50,000',
      subsidy: '60% (₹90,000)',
      payback: '2-3 years',
      benefit: '30-50% water saving',
      recommended: totalProfit > 100000
    },
    {
      name: 'Solar Water Pump',
      cost: '₹2,00,000',
      subsidy: '70% (₹1,40,000)',
      payback: '3-4 years',
      benefit: 'Zero electricity cost',
      recommended: totalProfit > 150000
    },
    {
      name: 'Greenhouse Farming',
      cost: '₹5,00,000',
      subsidy: '50% (₹2,50,000)',
      payback: '4-5 years',
      benefit: '3-4x higher yield',
      recommended: totalProfit > 200000
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-farming-earth/20 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Financial Analytics</h1>
              <p className="text-muted-foreground">Track your farm's financial performance</p>
            </div>
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last 1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Editable Monthly Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Data</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b">Month</th>
                  <th className="p-2 border-b">Spending (₹)</th>
                  <th className="p-2 border-b">Earnings (₹)</th>
                  <th className="p-2 border-b">Profit (₹)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((item, i) => (
                  <tr key={item.month} className="border-b">
                    <td className="p-2">{item.month}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={item.spending}
                        onChange={(e) => handleMonthlyValueChange(i, 'spending', e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={item.earnings}
                        onChange={(e) => handleMonthlyValueChange(i, 'earnings', e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className={`p-2 font-semibold text-right ${item.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {item.profit.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spending</p>
                  <p className="text-2xl font-bold">₹{totalSpending.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${totalProfit >= 0 ? 'bg-primary/20' : 'bg-warning/20'} rounded-full flex items-center justify-center`}>
                  <DollarSign className={`w-6 h-6 ${totalProfit >= 0 ? 'text-primary' : 'text-warning'}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                    ₹{Math.abs(totalProfit).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-farming-leaf/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-farming-leaf" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profit Margin</p>
                  <p className={`text-2xl font-bold ${parseFloat(profitMargin) >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {profitMargin}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>
                Financial Trend (
                {selectedPeriod === '1year'
                  ? 'Last 12 Months'
                  : selectedPeriod === '6months'
                    ? 'Last 6 Months'
                    : 'Last 3 Months'}
                )
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`₹${value.toLocaleString()}`, name]} />
                <Line type="monotone" dataKey="earnings" stroke="hsl(var(--success))" strokeWidth={3} name="Earnings" />
                <Line type="monotone" dataKey="spending" stroke="hsl(var(--destructive))" strokeWidth={3} name="Spending" />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={3} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown with Editable amounts */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={value => [`${value.toFixed(1)}%`]} />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={item.amount}
                    onChange={(e) => handleExpenseAmountChange(index, e.target.value)}
                    className="w-24 border rounded px-2 py-1 text-right"
                  />
                </div>
              ))}
            </div>

            {/* Add New Expense */}
            <div className="mt-6 space-y-2">
              <h4 className="font-semibold">Add New Expense</h4>
              <input
                type="text"
                placeholder="Expense Name"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
              <input
                type="number"
                min="0"
                placeholder="Amount (₹)"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
              <Button
                onClick={handleAddExpense}
                disabled={!newExpenseName.trim() || !newExpenseAmount}
              >
                Add Expense
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {totalProfit >= 0 ? (
                <PiggyBank className="w-5 h-5 text-success" />
              ) : (
                <AlertCircle className="w-5 h-5 text-warning" />
              )}
              <span>{totalProfit >= 0 ? 'Investment Opportunities' : 'Recovery Strategies'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {totalProfit >= 0 ? (
                investmentOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      option.recommended ? 'bg-success/5 border-success/20' : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{option.name}</h4>
                      {option.recommended && (
                        <Badge variant="secondary" className="bg-success/20 text-success">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Cost:</span> {option.cost}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Subsidy:</span> {option.subsidy}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Payback:</span> {option.payback}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Benefit:</span> {option.benefit}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg">
                    <Info className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium">Loss Recovery Strategy</p>
                      <p className="text-sm text-muted-foreground">
                        Focus on cost reduction and explore government schemes for financial support.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Immediate Actions:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Apply for Kisan Credit Card for immediate credit access</li>
                      <li>• Get soil testing done to optimize fertilizer usage</li>
                      <li>• Consider crop insurance for next season</li>
                      <li>• Explore contract farming opportunities</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Government Schemes */}
        <Card>
          <CardHeader>
            <CardTitle>Available Government Schemes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {governmentSchemes.map((scheme) => (
                <div key={scheme.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{scheme.name}</h4>
                    <Badge variant="outline">{scheme.type}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">{scheme.description}</p>

                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Eligibility:</span> {scheme.eligibility}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">
                        {scheme.applicable}
                      </Badge>
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      Learn More <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
