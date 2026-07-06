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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Heart,
  School,
  FileText,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  StudentStatusBadge,
  AdmissionStatusBadge,
  EnrollmentStatusBadge,
  DocumentStatusBadge,
  StudentTagBadge,
} from './badges';
import {
  getStudentFullName,
  calculateStudentAge,
  getPrimaryGuardian,
  getDocumentCompletionPercentage,
  formatStudentDate,
  formatStudentDateTime,
} from '@/domains/student-lifecycle/services/student-lifecycle';
import { timelineEvents } from '@/domains/student-lifecycle/mock-data/students';
import type { StudentRecord } from '@/domains/student-lifecycle/types';

interface StudentProfileDrawerProps {
  student: StudentRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentProfileDrawer({
  student,
  open,
  onOpenChange,
}: StudentProfileDrawerProps) {
  if (!student) return null;

  const primaryGuardian = getPrimaryGuardian(student);
  const studentTimeline = timelineEvents
    .filter((e) => e.studentId === student.id)
    .slice(0, 5);
  const docCompletion = getDocumentCompletionPercentage(student);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetDescription className="sr-only">
            Student profile details
          </SheetDescription>
          <SheetTitle className="sr-only">{student.displayName}</SheetTitle>
        </SheetHeader>

        <div className="mt-2 space-y-6 pb-8">
          {/* Identity header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {student.photoInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 pt-1">
              <h2 className="text-xl font-semibold text-foreground">
                {getStudentFullName(student)}
              </h2>
              <p className="text-sm text-muted-foreground">
                {student.admissionNumber}
                {student.rollNumber ? ` · Roll: ${student.rollNumber}` : ''}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <StudentStatusBadge status={student.status} />
                <AdmissionStatusBadge status={student.admissionStatus} />
                <EnrollmentStatusBadge status={student.enrollmentStatus} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Assignment */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Enrollment</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Class</p>
                <p className="text-sm font-medium text-foreground">
                  {student.classGradeName ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Section</p>
                <p className="text-sm font-medium text-foreground">
                  {student.sectionName ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Campus</p>
                <p className="text-sm font-medium text-foreground">
                  {student.campusName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Academic Year</p>
                <p className="text-sm font-medium text-foreground">
                  {student.academicYearName}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Personal details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Personal Details</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">DOB:</span>
                <span className="text-foreground">
                  {formatStudentDate(student.dateOfBirth)} ({calculateStudentAge(student.dateOfBirth)} yrs)
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Gender:</span>
                <span className="text-foreground">{student.gender}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Heart className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Blood Group:</span>
                <span className="text-foreground">{student.bloodGroup}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Address:</span>
                  <p className="text-foreground mt-0.5">
                    {student.address.line1}
                    {student.address.line2 ? `, ${student.address.line2}` : ''}
                    <br />
                    {student.address.city}, {student.address.state} - {student.address.postalCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {student.tags.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {student.tags.map((tag) => (
                    <StudentTagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Guardians */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Guardians</h3>
            <div className="space-y-3">
              {student.guardians.map((g) => (
                <div key={g.id} className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{g.name}</p>
                    {g.isPrimary && (
                      <span className="text-xs text-primary font-medium">Primary</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{g.relation} · {g.occupation}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3 w-3" /> {g.phone}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-3 w-3" /> {g.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Emergency contacts */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Emergency Contacts</h3>
            <div className="space-y-2">
              {student.emergencyContacts.map((ec) => (
                <div key={ec.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-foreground font-medium">{ec.name}</p>
                    <p className="text-xs text-muted-foreground">{ec.relation}</p>
                  </div>
                  <span className="text-muted-foreground">{ec.phone}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Health info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Health Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <Heart className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Blood Group:</span>
                <span className="text-foreground">{student.healthInfo.bloodGroup}</span>
              </div>
              {student.healthInfo.allergies.length > 0 && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">Allergies:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {student.healthInfo.allergies.map((a) => (
                        <span key={a} className="text-xs rounded bg-warning/10 text-warning px-2 py-0.5">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground pt-1">{student.healthInfo.emergencyNotes}</p>
            </div>
          </div>

          {student.previousSchool && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Previous School</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <School className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground">{student.previousSchool.schoolName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last class: {student.previousSchool.lastClassAttended} · Left: {student.previousSchool.yearOfLeaving}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reason: {student.previousSchool.reasonForLeaving}
                  </p>
                  {student.previousSchool.transferCertificateNumber && (
                    <p className="text-xs text-muted-foreground">
                      TC No: {student.previousSchool.transferCertificateNumber}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Documents summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Documents</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${docCompletion}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground">{docCompletion}%</span>
            </div>
            <div className="space-y-1.5">
              {student.documents.filter((d) => d.required).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-foreground">{doc.type}</span>
                  </div>
                  <DocumentStatusBadge status={doc.status} />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Recent timeline */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Recent Timeline</h3>
            {studentTimeline.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity for this student.</p>
            ) : (
              <div className="space-y-3">
                {studentTimeline.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div className="space-y-0.5">
                      <p className="text-sm text-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatStudentDateTime(event.timestamp)} · {event.actor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Metadata */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>Created: {formatStudentDateTime(student.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated: {formatStudentDateTime(student.updatedAt)}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
