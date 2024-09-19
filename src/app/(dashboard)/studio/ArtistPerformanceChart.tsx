import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Defs, LinearGradient } from 'recharts';

const data = [
  { month: 'Jan', streams: 1200 },
  { month: 'Feb', streams: 2100 },
  { month: 'Mar', streams: 1800 },
  { month: 'Apr', streams: 2600 },
  { month: 'May', streams: 3000 },
  { month: 'Jun', streams: 3500 },
  { month: 'Jul', streams: 3300 },
  { month: 'Aug', streams: 3900 },
  { month: 'Sep', streams: 4100 },
  { month: 'Oct', streams: 4500 },
  { month: 'Nov', streams: 4200 },
  { month: 'Dec', streams: 4700 },
];

const ArtistPerformanceChart = ({ currentMonth }) => {
  // Find the current month's data
  const currentMonthData = data.find(item => item.month === currentMonth);

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Artist Monthly Performance - Total Streams</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ top: 20, left:10, right: 10 }}>
          {/* Define gradient for the line */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2d3c" stopOpacity={1} />
              <stop offset="100%" stopColor="#2a2d3c" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {/* Grid with minimal styling */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* X and Y axes with labels */}
          <XAxis dataKey="month" tick={{ fill: '#2a2d3c', fontSize: 12 }} />
          <YAxis tick={{ fill: '#2a2d3c', fontSize: 12 }} axisLine={false} tickLine={false} />

          {/* Tooltip */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#dddddd' }} 
            labelStyle={{ color: '#2a2d3c' }} 
            formatter={(value) => [`${value} streams`, 'Streams']} 
          />

          {/* Line with gradient and subtle animation */}
          <Line 
            type="monotone" 
            dataKey="streams" 
            stroke="url(#lineGradient)" 
            strokeWidth={4} 
            dot={{ r: 5, stroke: '#2a2d3c', strokeWidth: 2 }} 
            activeDot={{ r: 8 }} 
            isAnimationActive={true} 
            animationBegin={500} 
            animationDuration={1500} 
          />

          {/* Highlight the current month with a vertical line */}
          {currentMonthData && (
            <ReferenceLine 
              x={currentMonthData.month} 
              stroke="#A16EFF" 
              strokeWidth={2} 
              label={{ value: 'Current Month', position: 'top', fill: '#A16EFF', fontSize: 12 }} 
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ArtistPerformanceChart;