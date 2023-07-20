import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const Chartspie = ({ Municipality }) => {




  const COLORS = ['#f66d43', '#ffaf66', '#778ebe', '#64c2a7', '#2d87bb'];
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
      return (
          <text className="font-bold font-white" x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {`${(percent * 100).toFixed(0)}%`}
          </text>
      );
  };

  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-[#71b5f5] p-2 active:outline-none " style={{ border: '1px solid white' }}>
          {console.log(payload)}
          <p className="label" style={{ color: 'white' }}>{`${payload[0].payload.municipalityName} : ${payload[0].payload.count}`}</p>
        </div>
      );
    }
    return null;
  };



  return (
    <>
      {
        Municipality.length !== 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={Municipality}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="count"
            >
              {Municipality.map((entry,index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        ) : <div class="text-base mt-6 text-center font-semibold">No data</div>
      }

    </>
  )
}


export default Chartspie;