import { CHART_DEFAULT_HEIGHT } from '@/constants/chart.constants'
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const CircleChart = ({
  series,
  label,
  color,
  height = CHART_DEFAULT_HEIGHT
}: {
  series: ChartProps['series']
  label: string
  color: string
  height?: number
}) => {
  return (
    <ReactApexChart
      options={{
        chart: {
          type: 'radialBar',
          offsetY: -15,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            track: {
              background: '#000',
              margin: 15
            },
            dataLabels: {
              name: {
                show: true,
                fontSize: '15px',
                offsetY: 20,
                color
              },
              value: {
                offsetY: -20,
                fontSize: '30px',
                color
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        fill: {
          colors: [color]
        },
        title: {
          text: '',
          align: 'center',
          style: {
            fontSize: '0px'
          }
        },
        labels: [label]
      }}
      series={series}
      type="radialBar"
      height={height}
    />
  )
}

export default CircleChart
