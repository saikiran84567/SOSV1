import { DomainPlaceholder } from '@/shared/components/domain-placeholder';
import { domainMeta } from '@/shared/mock-data/domains';

export default function DocumentsPage() {
  return <DomainPlaceholder meta={domainMeta['documents']} />;
}
