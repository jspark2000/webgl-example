import CircleChart from '@/components/charts/CircleChart'
import GaugeChart from '@/components/charts/GaugeChart'
import LineChart from '@/components/charts/LineChart'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function SystemMornitoringSection() {
  return (
    <section className="flex flex-col">
      <h2 className="mb-1.5 text-lg font-bold">시스템 모니터링</h2>
      <div className="grid grid-cols-5 border-2 border-gray-950 py-3">
        <div className="col-span-1 flex flex-col items-center">
          <h4 className="font-bold">목표량</h4>
          <CircleChart series={[27]} label="가동중" color="#008000" />
          <div className="-mt-10 flex flex-col">
            <p className="text-blue-600">지시: 1000</p>
            <p>생산: 271</p>
            <p className="text-red-600">불량: 0</p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <h4 className="font-bold">금일작업</h4>
          <CircleChart series={[87]} label="비가동" color="#ff0000" />
          <div className="-mt-10 flex flex-col">
            <p className="text-blue-600">지시: 1200</p>
            <p>생산: 1050</p>
            <p className="text-red-600">불량: 2</p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col text-center">
          <h4 className="font-bold">이상상황</h4>
          <div className="grid h-full grid-cols-2 gap-y-5 py-5">
            <div className="flex flex-col items-center space-y-1">
              <ExclamationTriangleIcon className="h-10 w-10 text-red-600" />
              <p className="font-semibold">위험</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ExclamationTriangleIcon className="h-10 w-10 text-amber-600" />
              <p className="font-semibold">경고</p>
              <p className="text-2xl font-bold text-amber-600">2</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ExclamationTriangleIcon className="h-10 w-10 text-blue-600" />
              <p className="font-semibold">조심</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ExclamationTriangleIcon className="h-10 w-10 text-yellow-600" />
              <p className="font-semibold">주의</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center">
          <h4 className="font-bold">로봇 시스템</h4>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <GaugeChart
                series={[46.4]}
                color="#2563eb"
                title="컨트롤러 온도"
                height={220}
              />
            </div>
            <div className="col-span-1">
              <GaugeChart
                series={[32.2]}
                color="#ca8a04"
                title="관절 온도"
                height={220}
              />
            </div>
            <div className="col-span-2 px-10">
              <LineChart
                title="전류"
                series={[
                  { name: '컨트롤러', data: [10, 20, 30, 40, 10, 20] },
                  { name: '관절', data: [20, 10, 30, 10, 20, 40] }
                ]}
                categories={[]}
                height={180}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
