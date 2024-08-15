import React, { PureComponent, useEffect, useState } from "react";
import axios from "axios";
import {
    AreaChart,
    Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ClassDistributionChart3() {
  const [chartData, setChartData] = useState([]);
  const getChartData = async () => {
    try {
      const response = await axios.get(
        "/api/admin/bookingClassDistribution/all/monthly"
      );
      setChartData(response.data.classDistribution);
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
        <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="first" stroke="#8884d8" fill="#ff0000" />
          <Area type="monotone" dataKey="second" stroke="#1184d8" fill="#00ff00" />
          <Area type="monotone" dataKey="third" stroke="#00ffd8" fill="#0000ff" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClassDistributionChart3;
