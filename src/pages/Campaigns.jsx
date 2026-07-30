import KitShell from '@/components/kit/KitShell';
import GoogleAdsBuild from '@/components/kit/GoogleAdsBuild';
import NegativeKeywords from '@/components/kit/NegativeKeywords';
import MetaAdsBuild from '@/components/kit/MetaAdsBuild';

export default function Campaigns() {
  return (
    <KitShell
      title="Campaigns"
      subtitle="Paid acquisition builds for Coverage.Health. Launch order: Google Search S4 (brand) + S1 (core) first, Meta M1 after 25+ Google leads validate the funnel. Replace every [PLACEHOLDER] and tracking ID before spending."
    >
      <GoogleAdsBuild />
      <NegativeKeywords />
      <MetaAdsBuild />
    </KitShell>
  );
}