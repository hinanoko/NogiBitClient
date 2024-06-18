import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';

echarts.use([BarChart, CanvasRenderer, GridComponent]);

const Gamble = function () {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        const option = {
            xAxis: {
                type: 'category',
                data: [- 5, -4, -3, -2, -1, 1, 2, 3, 4, 5],
                splitLine: { show: false }, // 隐藏网格线
                axisLine: { show: true }, // 显示 x 轴线
                axisTick: { show: true }  // 显示 x 轴刻度线
            },
            yAxis: {
                type: 'value',
                splitLine: { show: false }, // 隐藏网格线
                axisLine: { show: true }, // 显示 y 轴线
                axisTick: { show: true }  // 显示 y 轴刻度线
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130, 90, 100, 170],
                    type: 'bar',
                    barWidth: '20%' // 调整条形的宽度
                }
            ]
        };
        myChart.setOption(option);
    }, []);

    return (
        <div>
            This is gamble
            <div ref={chartRef} style={{ width: '50%', height: '400px' }}></div>
        </div>
    );
}

export default Gamble;
