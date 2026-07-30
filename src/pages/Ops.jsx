import KitShell from '@/components/kit/KitShell';
import LaunchPlan from '@/components/kit/LaunchPlan';
import TrackingArchitecture from '@/components/kit/TrackingArchitecture';
import ComplianceChecklist from '@/components/kit/ComplianceChecklist';

export default function Ops() {
  return (
    <KitShell
      title="Ops"
      subtitle="Operational playbook for Coverage.Health. Start with the Phase 1 checklist in the 90-day plan — nothing spends until every [PLACEHOLDER] and tracking ID is replaced and legal has signed off."
    >
      <LaunchPlan />
      <TrackingArchitecture />
      <ComplianceChecklist />
    </KitShell>
  );
}