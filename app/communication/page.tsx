import { DomainPlaceholder } from '@/shared/components/domain-placeholder';
import { domainMeta } from '@/shared/mock-data/domains';

export default function CommunicationPage() {
  return <DomainPlaceholder meta={domainMeta['communication']} />;
}
