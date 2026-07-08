'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndianRupee, FileText, Calendar, CreditCard, Gift, TriangleAlert as AlertTriangle, Activity, Percent } from 'lucide-react';
import { PageHeader } from '@/shared/components/page-header';
import { StatCard } from '@/shared/components/stat-card';
import { OverviewTab } from '@/domains/finance/components/overview-tab';
import { FeeStructuresTab } from '@/domains/finance/components/fee-structures-tab';
import { FeeStructureDrawer } from '@/domains/finance/components/fee-structure-drawer';
import { BillingPlansTab } from '@/domains/finance/components/billing-plans-tab';
import { InvoicesTab } from '@/domains/finance/components/invoices-tab';
import { PaymentsTab } from '@/domains/finance/components/payments-tab';
import { ConcessionsScholarshipsTab } from '@/domains/finance/components/concessions-scholarships-tab';
import { DuesCollectionTab } from '@/domains/finance/components/dues-collection-tab';
import { FinanceActivityTab } from '@/domains/finance/components/finance-activity-tab';
import { calculateFinanceStats, formatCurrencyINR } from '@/domains/finance/services/finance';
import {
  feeCategories,
  feeStructures,
  billingPlans,
  studentFeeAssignments,
  studentInvoices,
  paymentRecords,
  concessionRecords,
  scholarshipRecords,
  studentDueSummaries,
  feeCollectionSummaries,
  financeAlerts,
  financeActivityEvents,
  receiptReadinessItems,
} from '@/domains/finance/mock-data/finance';
import type { FeeStructure } from '@/domains/finance/types';

export default function FinancePage() {
  const [selectedStructure, setSelectedStructure] = useState<FeeStructure | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = calculateFinanceStats({
    feeStructures,
    invoices: studentInvoices,
    payments: paymentRecords,
    concessions: concessionRecords,
    scholarships: scholarshipRecords,
  });

  const handleViewStructure = (structure: FeeStructure) => {
    setSelectedStructure(structure);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Core"
        description="Manage fee structures, billing plans, student invoices, payment records, concessions, scholarships, and track dues & collection status across the school."
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          stat={{
            label: 'Active Structures',
            value: String(stats.activeFeeStructures),
            icon: FileText,
            accent: 'primary',
          }}
        />
        <StatCard
          stat={{
            label: 'Invoices Issued',
            value: String(stats.invoicesIssued),
            icon: Calendar,
            accent: 'primary',
          }}
        />
        <StatCard
          stat={{
            label: 'Amount Collected',
            value: formatCurrencyINR(stats.totalAmountCollected),
            icon: IndianRupee,
            accent: 'success',
          }}
        />
        <StatCard
          stat={{
            label: 'Outstanding Dues',
            value: formatCurrencyINR(stats.totalOutstandingDues),
            icon: IndianRupee,
            accent: 'warning',
          }}
        />
        <StatCard
          stat={{
            label: 'Overdue Invoices',
            value: String(stats.overdueInvoices),
            icon: AlertTriangle,
            accent: 'destructive',
          }}
        />
        <StatCard
          stat={{
            label: 'Collection Rate',
            value: `${stats.collectionRate}%`,
            icon: Percent,
            accent: 'info',
          }}
        />
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full lg:w-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="structures" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Structures</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Invoices</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="concessions" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span className="hidden sm:inline">Concessions</span>
          </TabsTrigger>
          <TabsTrigger value="dues" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Dues</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            stats={stats}
            alerts={financeAlerts}
            collectionSummaries={feeCollectionSummaries}
            receiptReadiness={receiptReadinessItems}
          />
        </TabsContent>

        <TabsContent value="structures">
          <FeeStructuresTab
            feeStructures={feeStructures}
            onViewStructure={handleViewStructure}
          />
        </TabsContent>

        <TabsContent value="billing">
          <BillingPlansTab billingPlans={billingPlans} />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoicesTab invoices={studentInvoices} />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentsTab payments={paymentRecords} />
        </TabsContent>

        <TabsContent value="concessions">
          <ConcessionsScholarshipsTab
            concessions={concessionRecords}
            scholarships={scholarshipRecords}
          />
        </TabsContent>

        <TabsContent value="dues">
          <DuesCollectionTab
            dueSummaries={studentDueSummaries}
            collectionSummaries={feeCollectionSummaries}
          />
        </TabsContent>

        <TabsContent value="activity">
          <FinanceActivityTab activityEvents={financeActivityEvents} />
        </TabsContent>
      </Tabs>

      {/* Fee Structure Detail Drawer */}
      <FeeStructureDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        structure={selectedStructure}
        billingPlans={billingPlans}
        activityEvents={financeActivityEvents}
      />
    </div>
  );
}
