import { DomainPlaceholder } from '@/shared/components/domain-placeholder';
import { domainMeta } from '@/shared/mock-data/domains';

export default function AnalyticsPage() {
  return <DomainPlaceholder meta={domainMeta['analytics']} />;
}
