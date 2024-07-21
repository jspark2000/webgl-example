import RobotStatusSection from './RobotStatusSection'
import SystemMornitoringSection from './SystemMornitoringSection'

export default function Page() {
  return (
    <div className="flex w-full flex-col space-y-10 px-20 py-10">
      <RobotStatusSection />
      <SystemMornitoringSection />
    </div>
  )
}
