import { CHART_DEFAULT_HEIGHT } from '@/constants/chart.constants'
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts'

const GaugeChart = ({
  series,
  color,
  title,
  height = CHART_DEFAULT_HEIGHT
}: {
  series: ChartProps['series']
  color: string
  title: string
  height?: number
}) => {
  return (
    <div>
      <ReactApexChart
        options={{
          series: series,
          chart: {
            type: 'radialBar',
            offsetY: -5,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: '#000000',
                margin: 5
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -10,
                  fontSize: '18px',
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
            text: title,
            align: 'center',
            style: {
              color: color,
              fontSize: '13px'
            },
            offsetY: 20
          }
        }}
        series={series}
        type="radialBar"
        height={height}
      />
    </div>
  )
}

export default GaugeChart
