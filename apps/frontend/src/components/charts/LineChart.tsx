import { CHART_DEFAULT_HEIGHT } from '@/constants/chart.constants'
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const LineChart = ({
  series,
  categories,
  title,
  height = CHART_DEFAULT_HEIGHT
}: {
  series: ChartProps['series']
  categories: any[]
  title: string
  height?: number
}) => {
  return (
    <div className="w-full">
      <ReactApexChart
        series={series}
        type="line"
        height={height}
        width={'100%'}
        options={{
          chart: {
            height,
            type: 'line',
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            tickAmount: 15,
            categories: categories
          },
          title: {
            align: 'left',
            text: title,
            offsetY: 10
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
            fontSize: '12px'
          },
          colors: ['#2563eb', '#ca8a04']
        }}
      />
    </div>
  )
}

export default LineChart
