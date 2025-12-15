import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Ticket, Users, TrendingUp, Activity } from 'lucide-react';

const salesData = [
  { date: 'Mon', sales: 4200 },
  { date: 'Tue', sales: 3800 },
  { date: 'Wed', sales: 5100 },
  { date: 'Thu', sales: 4600 },
  { date: 'Fri', sales: 6200 },
  { date: 'Sat', sales: 7800 },
  { date: 'Sun', sales: 6500 },
];

const checkInData = [
  { gate: 'Gate A', count: 245 },
  { gate: 'Gate B', count: 189 },
  { gate: 'Gate C', count: 312 },
  { gate: 'Gate D', count: 156 },
];

const recentActivity = [
  { id: 1, type: 'check-in', description: 'John Doe checked in at Gate A', time: '2 minutes ago' },
  { id: 2, type: 'order
