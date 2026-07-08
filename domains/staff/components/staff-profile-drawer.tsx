'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, Mail, Phone, MapPin, Building, Users, FileText, GraduationCap, Briefcase, Award, User } from 'lucide-react';
import { StaffStatusBadge, EmploymentTypeBadge, RoleCategoryBadge, GenderBadge, TenureBadge } from './badges';
import { formatStaffDate } from '../services/staff';
import type { StaffProfile, StaffQualification, StaffWorkloadSnapshot, StaffDocumentSummary, StaffIdentitySummary } from '../types';

interface StaffProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffProfile | null;
  qualifications: StaffQualification[];
  workloads: StaffWorkloadSnapshot[];
  documents: StaffDocumentSummary[];
  identity: StaffIdentitySummary | null;
}

export function StaffProfileDrawer({
  open,
  onOpenChange,
  staff,
  qualifications,
  workloads,
  documents,
  identity,
}: StaffProfileDrawerProps) {
  if (!staff) return null;

  const staffQualifications = qualifications.filter((q) => q.staffId === staff.id);
  const staffWorkload = workloads.find((w) => w.staffId === staff.id);
  const staffDocuments = documents.filter((d) => d.staffId === staff.id);
  const highestQualification = staffQualifications.find((q) => q.isHighestQualification) || staffQualifications[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-hidden flex flex-col">
        <SheetHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center shrink-0">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-lg">{staff.fullName}</SheetTitle>
              <SheetDescription className="mt-1">
                {staff.designation} | {staff.departmentName}
              </SheetDescription>
              <div className="flex flex-wrap gap-1 mt-2">
                <StaffStatusBadge status={staff.status} />
                <EmploymentTypeBadge type={staff.employmentType} />
                <RoleCategoryBadge category={staff.roleCategory} />
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pb-6">
            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium truncate">{staff.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{staff.phone}</p>
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{staff.departmentName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Campus</p>
                    <p className="text-sm font-medium">{staff.campusName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Reports To</p>
                    <p className="text-sm font-medium">{staff.reportingManagerName || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Designation</p>
                    <p className="text-sm font-medium">{staff.designation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <TenureBadge years={staff.totalExperienceYears} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Gender</p>
                    <GenderBadge gender={staff.gender} />
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Joining Date</p>
                  <p className="text-sm font-medium">{formatStaffDate(staff.joiningDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="text-sm font-medium">{formatStaffDate(staff.dateOfBirth)}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Bio */}
            {staff.bio && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">{staff.bio}</p>
                </div>
                <Separator />
              </>
            )}

            {/* Qualifications */}
            {staffQualifications.length > 0 && (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">
                      Qualifications ({staffQualifications.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {staffQualifications.slice(0, 4).map((qual) => (
                      <div
                        key={qual.id}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm"
                      >
                        <div>
                          <p className="font-medium">{qual.degreeName}</p>
                          <p className="text-xs text-muted-foreground">
                            {qual.institution} | {qual.yearOfPassing}
                          </p>
                        </div>
                        {qual.isHighestQualification && (
                          <Badge variant="default" className="text-xs">Highest</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Workload Info */}
            {staffWorkload && (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">Workload & Readiness</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-lg font-bold">{staffWorkload.utilizationPercentage}%</p>
                      <p className="text-xs text-muted-foreground">Workload</p>
                      <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, staffWorkload.utilizationPercentage)}%` }} />
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-lg font-bold">{staffWorkload.readinessScore}%</p>
                      <p className="text-xs text-muted-foreground">Readiness Score</p>
                      <div className="h-1.5 mt-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${staffWorkload.readinessScore}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Documents */}
            {staffDocuments.length > 0 && (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-medium">
                      Documents ({staffDocuments.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {staffDocuments.slice(0, 4).map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.documentType}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.verificationStatus}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            doc.verificationStatus === 'Verified' ? 'default' :
                            doc.verificationStatus === 'Pending' ? 'outline' :
                            doc.verificationStatus === 'Expired' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {doc.verificationStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Identity Info */}
            {identity && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-3">Identity Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {identity.aadhaarNumber && (
                      <div className="p-2 rounded-md bg-muted/50">
                        <p className="text-xs text-muted-foreground">Aadhaar</p>
                        <p className="font-mono">{identity.aadhaarNumber}</p>
                      </div>
                    )}
                    {identity.panNumber && (
                      <div className="p-2 rounded-md bg-muted/50">
                        <p className="text-xs text-muted-foreground">PAN</p>
                        <p className="font-mono">{identity.panNumber}</p>
                      </div>
                    )}
                    {identity.bloodGroup && (
                      <div className="p-2 rounded-md bg-muted/50">
                        <p className="text-xs text-muted-foreground">Blood Group</p>
                        <p className="font-medium">{identity.bloodGroup}</p>
                      </div>
                    )}
                    <div className="p-2 rounded-md bg-muted/50">
                      <p className="text-xs text-muted-foreground">Nationality</p>
                      <p className="font-medium">{identity.nationality}</p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-xl font-bold">{staff.qualificationsCount}</p>
                <p className="text-xs text-muted-foreground">Qualifications</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-xl font-bold">{staff.documentsCount}</p>
                <p className="text-xs text-muted-foreground">Documents</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-xl font-bold">{staff.currentRoleExperienceYears}</p>
                <p className="text-xs text-muted-foreground">Years in Role</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="text-xs text-muted-foreground">
              <p>Employee ID: {staff.employeeId}</p>
              <p>Created: {formatStaffDate(staff.createdAt)}</p>
              <p>Updated: {formatStaffDate(staff.updatedAt)}</p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
