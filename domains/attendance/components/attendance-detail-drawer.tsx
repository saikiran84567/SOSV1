'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  Calendar,
  User,
  Users,
  MapPin,
  Phone,
  Mail,
  Hash,
  Building,
  Briefcase,
} from 'lucide-react';
import { AttendanceStatusBadge, SessionStatusBadge } from './badges';
import {
  formatAttendanceDate,
  formatAttendanceTime,
  calculateAttendancePercentage,
} from '@/domains/attendance/services/attendance';
import type { StudentAttendanceRecord, StaffAttendanceRecord, AttendanceRecord } from '@/domains/attendance/types';

interface AttendanceDetailDrawerProps {
  record: AttendanceRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function isStudentRecord(record: AttendanceRecord): record is StudentAttendanceRecord {
  return record.personType === 'Student';
}

function isStaffRecord(record: AttendanceRecord): record is StaffAttendanceRecord {
  return record.personType === 'Staff';
}

export function AttendanceDetailDrawer({
  record,
  open,
  onOpenChange,
}: AttendanceDetailDrawerProps) {
  if (!record) return null;

  const isStudent = isStudentRecord(record);
  const isStaff = isStaffRecord(record);

  const initials = record.personName.split(' ').map((n) => n[0]).join('').slice(0, 2);

  const summaryStats = {
    present: record.status === 'Present' || record.status === 'Late' ? 1 : 0,
    total: 1,
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetDescription className="sr-only">
            Attendance record details
          </SheetDescription>
          <SheetTitle className="sr-only">{record.personName}</SheetTitle>
        </SheetHeader>

        <div className="mt-2 space-y-6 pb-8">
          {/* Identity header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className={isStudent ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'} text-lg font-semibold>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 pt-1">
              <h2 className="text-xl font-semibold text-foreground">
                {record.personName}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isStudent && (
                  <span>{(record as StudentAttendanceRecord).admissionNumber}</span>
                )}
                {isStaff && (
                  <span>{(record as StaffAttendanceRecord).employeeCode}</span>
                )}
                <span className="text-muted-foreground/50">|</span>
                <span>{record.personType}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <AttendanceStatusBadge status={record.status} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Session Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Session Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium text-foreground">
                  {formatAttendanceDate(record.date)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Session</p>
                <p className="text-sm font-medium text-foreground">
                  {record.sessionName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Campus</p>
                <p className="text-sm font-medium text-foreground">
                  {record.campusName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Source</p>
                <p className="text-sm font-medium text-foreground">
                  {record.source}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Student/Staff Specific Details */}
          {isStudent && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Student Details</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Class:</span>{' '}
                    <span className="text-foreground">
                      {(record as StudentAttendanceRecord).classGradeName} - {(record as StudentAttendanceRecord).sectionName}
                    </span>
                  </div>
                </div>
                {(record as StudentAttendanceRecord).rollNumber && (
                  <div className="flex items-center gap-3 text-sm">
                    <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-muted-foreground">Roll Number:</span>{' '}
                      <span className="text-foreground">
                        {(record as StudentAttendanceRecord).rollNumber}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Guardian:</span>{' '}
                    <span className="text-foreground">
                      {(record as StudentAttendanceRecord).guardianName}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Guardian Phone:</span>{' '}
                    <span className="text-foreground">
                      {(record as StudentAttendanceRecord).guardianPhone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isStaff && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Staff Details</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Department:</span>{' '}
                    <span className="text-foreground">
                      {(record as StaffAttendanceRecord).departmentName}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Role:</span>{' '}
                    <span className="text-foreground">
                      {(record as StaffAttendanceRecord).roleName}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Shift:</span>{' '}
                    <span className="text-foreground">
                      {(record as StaffAttendanceRecord).shiftName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Time Tracking */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Time Tracking</h3>
            <div className="grid grid-cols-2 gap-3">
              {isStaff && (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected Check-in</p>
                    <p className="text-sm font-medium text-foreground">
                      {(record as StaffAttendanceRecord).expectedCheckInTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected Check-out</p>
                    <p className="text-sm font-medium text-foreground">
                      {(record as StaffAttendanceRecord).expectedCheckOutTime}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-xs text-muted-foreground">Actual Check-in</p>
                <p className="text-sm font-medium text-foreground">
                  {formatAttendanceTime(
                    isStaff
                      ? (record as StaffAttendanceRecord).checkInTime
                      : (record as StudentAttendanceRecord).checkInTime
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Actual Check-out</p>
                <p className="text-sm font-medium text-foreground">
                  {formatAttendanceTime(
                    isStaff
                      ? (record as StaffAttendanceRecord).checkOutTime
                      : (record as StudentAttendanceRecord).checkOutTime
                  )}
                </p>
              </div>
            </div>
          </div>

          {record.remarks && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Remarks</h3>
                <p className="text-sm text-foreground bg-muted/30 rounded-lg p-3">
                  {record.remarks}
                </p>
              </div>
            </>
          )}

          <Separator />

          {/* Marking Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Marking Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-muted-foreground">Marked by:</span>{' '}
                  <span className="text-foreground">{record.markedByName}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-muted-foreground">Marked at:</span>{' '}
                  <span className="text-foreground">
                    {new Date(record.markedAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Academic Context */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Academic Context</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Academic Year</p>
                <p className="text-foreground">{record.academicYearName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Record ID</p>
                <p className="text-foreground font-mono text-xs">{record.id}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>Created: {new Date(record.createdAt).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated: {new Date(record.updatedAt).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
