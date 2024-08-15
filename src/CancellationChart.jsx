import React, { PureComponent, useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CancellationChart() {
  const [chartData, setChartData] = useState([]);
  const getChartData = async () => {
    try {
      const response = await axios.get(
        "/api/admin/bookingsCount/cancelled/all/monthly"
      );
      setChartData(response.data.bookingsBreakdown);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getChartData();
  }, []);
  return (
    
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1184d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CancellationChart;
