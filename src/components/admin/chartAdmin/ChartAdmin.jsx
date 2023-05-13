import "./chartAdmin.scss";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../../../config/config"; 
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../loading/Loading";

const ChartAdmin = ({ aspect, title }) => {
  const [monthlyCount, setMonthlyCount] = useState(null);
  useEffect(() => {
    let initialMonthlyCount = null;
    const fetchMonthlyCount = async () => {
      const res = await axios.get(SERVER_URL + "/posts/monthly-count");
      initialMonthlyCount = res.data;
      setMonthlyCount(initialMonthlyCount);
    };
    fetchMonthlyCount();
  }, []);
  
  if (!monthlyCount) {
    return <Loading/>
  }
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="chart-body">
      <ResponsiveContainer width="65%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={monthlyCount}
          margin={{ top: 10, right: 50, left: 50, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartAdmin;
