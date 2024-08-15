import React, { PureComponent, useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ClassDistributionChart2() {
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
        <BarChart
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
          <Bar
            dataKey="first"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="second"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            dataKey="third"
            fill="#43119d"
            activeBar={<Rectangle fill="red" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClassDistributionChart2;
