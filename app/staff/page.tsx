import { DomainPlaceholder } from '@/shared/components/domain-placeholder';
import { domainMeta } from '@/shared/mock-data/domains';

export default function StaffPage() {
  return <DomainPlaceholder meta={domainMeta['staff']} />;
}
