'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Building, Calendar, FileText, IndianRupee, Layers, Clock } from 'lucide-react';
import { FeeStructureStatusBadge } from './badges';
import { formatCurrencyINR, formatFinanceDate, formatFinanceDateTime } from '../services/finance';
import type { FeeStructure, BillingPlan, FinanceActivityEvent } from '../types';

interface FeeStructureDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  structure: FeeStructure | null;
  billingPlans: BillingPlan[];
  activityEvents: FinanceActivityEvent[];
}

export function FeeStructureDrawer({
  open,
  onOpenChange,
  structure,
  billingPlans,
  activityEvents,
}: FeeStructureDrawerProps) {
  if (!structure) return null;

  const relatedPlans = billingPlans.filter((bp) => bp.feeStructureId === structure.id);
  const relatedEvents = activityEvents.filter(
    (e) => e.relatedEntity.type === 'FeeStructure' && e.relatedEntity.id === structure.id
  ).slice(0, 5);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-hidden flex flex-col">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <SheetTitle className="text-lg">{structure.name}</SheetTitle>
              <SheetDescription className="mt-1">
                {structure.academicYearName} | {structure.classGradeName}
              </SheetDescription>
            </div>
            <FeeStructureStatusBadge status={structure.status} />
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pb-6">
            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Campus</p>
                    <p className="text-sm font-medium">{structure.campusName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Effective From</p>
                    <p className="text-sm font-medium">{formatFinanceDate(structure.effectiveFrom)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="text-sm font-medium">{formatCurrencyINR(structure.totalAmount)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Categories</p>
                    <p className="text-sm font-medium">{structure.categoryBreakdownCount} included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            {structure.note && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Note</h4>
                  <p className="text-sm text-muted-foreground">{structure.note}</p>
                </div>
              </>
            )}

            {/* Billing Plans */}
            <Separator />
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">
                  Billing Plans ({relatedPlans.length})
                </h4>
              </div>
              <div className="space-y-2">
                {relatedPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50"
                  >
                    <div>
                      <p className="text-sm font-medium">{plan.installmentName}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {formatFinanceDate(plan.dueDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrencyINR(plan.amount)}</p>
                      <Badge variant="outline" className="text-xs">{plan.status}</Badge>
                    </div>
                  </div>
                ))}
                {relatedPlans.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No billing plans configured
                  </p>
                )}
              </div>
            </div>

            {/* Category IDs */}
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">Fee Categories</h4>
              <div className="flex flex-wrap gap-2">
                {structure.categoryIds.map((catId) => (
                  <Badge key={catId} variant="secondary">
                    {catId.replace('fee-cat-', 'Category ')}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            {relatedEvents.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">Recent Activity</h4>
                  </div>
                  <div className="space-y-2">
                    {relatedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-2 p-2 rounded-md bg-muted/30"
                      >
                        <div className="flex-1">
                          <p className="text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFinanceDateTime(event.timestamp)} by {event.actor}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Metadata */}
            <Separator />
            <div className="text-xs text-muted-foreground">
              <p>ID: {structure.id}</p>
              <p>Created: {formatFinanceDateTime(structure.createdAt)}</p>
              <p>Updated: {formatFinanceDateTime(structure.updatedAt)}</p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
