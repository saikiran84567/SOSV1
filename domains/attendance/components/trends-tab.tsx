'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { attendanceTrends, CURRENT_DATE } from '@/domains/attendance/mock-data/attendance';
import { formatAttendanceDate } from '@/domains/attendance/services/attendance';

export function TrendsTab() {
  const stats = useMemo(() => {
    const latest = attendanceTrends[attendanceTrends.length - 1];
    const previous = attendanceTrends[attendanceTrends.length - 2];
    const weekAgo = attendanceTrends[0];

    const studentChange = latest.studentPercentage - previous.studentPercentage;
    const staffChange = latest.staffPercentage - previous.staffPercentage;
    const weeklyStudentChange = latest.studentPercentage - weekAgo.studentPercentage;

    const avgStudent = Math.round(
      attendanceTrends.reduce((sum, t) => sum + t.studentPercentage, 0) / attendanceTrends.length
    );
    const avgStaff = Math.round(
      attendanceTrends.reduce((sum, t) => sum + t.staffPercentage, 0) / attendanceTrends.length
    );
    const avgAbsentee = Math.round(
      attendanceTrends.reduce((sum, t) => sum + t.absenteeCount, 0) / attendanceTrends.length
    );
    const avgLate = Math.round(
      attendanceTrends.reduce((sum, t) => sum + t.lateCount, 0) / attendanceTrends.length
    );

    return {
      latest,
      studentChange,
      staffChange,
      weeklyStudentChange,
      avgStudent,
      avgStaff,
      avgAbsentee,
      avgLate,
    };
  }, []);

  function getTrendIcon(change: number) {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-success" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }

  function getTrendColor(change: number) {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  }

  const getBarColor = (value: number) => {
    if (value >= 90) return 'bg-success';
    if (value >= 75) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Student Attendance</p>
                <p className="text-2xl font-semibold">{stats.avgStudent}%</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {getTrendIcon(stats.studentChange)}
              <span className={`text-xs ${getTrendColor(stats.studentChange)}`}>
                {stats.studentChange > 0 ? '+' : ''}{stats.studentChange}% from yesterday
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Staff Attendance</p>
                <p className="text-2xl font-semibold">{stats.avgStaff}%</p>
              </div>
              <div className="rounded-lg bg-success/10 p-2.5">
                <UserCheck className="h-4 w-4 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {getTrendIcon(stats.staffChange)}
              <span className={`text-xs ${getTrendColor(stats.staffChange)}`}>
                {stats.staffChange > 0 ? '+' : ''}{stats.staffChange}% from yesterday
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Daily Absentees</p>
                <p className="text-2xl font-semibold">{stats.avgAbsentee}</p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-2.5">
                <TrendingDown className="h-4 w-4 text-destructive" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.latest.absenteeCount} today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Daily Late Arrivals</p>
                <p className="text-2xl font-semibold">{stats.avgLate}</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-2.5">
                <TrendingUp className="h-4 w-4 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.latest.lateCount} today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Student vs Staff Attendance Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Attendance Trend (Last 2 Weeks)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Student and staff attendance percentage over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-48">
            {attendanceTrends.map((trend) => (
              <div key={trend.date} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <div className="relative w-full flex flex-col items-center" style={{ height: '140px' }}>
                  {/* Student bar */}
                  <div
                    className={`w-full max-w-[16px] rounded-t-sm ${getBarColor(trend.studentPercentage)}`}
                    style={{ height: `${trend.studentPercentage}%` }}
                    title={`Student: ${trend.studentPercentage}%`}
                  />
                  {/* Staff bar */}
                  <div
                    className={`absolute w-full max-w-[16px] rounded-t-sm opacity-40 ${getBarColor(trend.staffPercentage)}`}
                    style={{
                      height: `${trend.staffPercentage}%`,
                      left: '50%',
                      transform: 'translateX(50%)',
                    }}
                    title={`Staff: ${trend.staffPercentage}%`}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {new Date(trend.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </p>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-sm bg-primary opacity-100" />
              <span className="text-muted-foreground">Student Attendance</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-sm bg-success opacity-40" />
              <span className="text-muted-foreground">Staff Attendance</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Absentee and Late Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Absentee Count Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceTrends.map((trend) => {
                const maxAbsentee = Math.max(...attendanceTrends.map((t) => t.absenteeCount));
                const width = (trend.absenteeCount / maxAbsentee) * 100;
                return (
                  <div key={trend.date} className="flex items-center gap-3">
                    <p className="text-xs text-muted-foreground w-16 shrink-0">
                      {new Date(trend.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                    <div className="flex-1 h-4 bg-muted/50 rounded overflow-hidden">
                      <div
                        className={`h-full rounded transition-all ${
                          trend.absenteeCount > 150
                            ? 'bg-destructive'
                            : trend.absenteeCount > 100
                            ? 'bg-warning'
                            : 'bg-success'
                        }`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <p className="text-xs font-medium w-10 text-right">{trend.absenteeCount}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Late Arrivals Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceTrends.map((trend) => {
                const maxLate = Math.max(...attendanceTrends.map((t) => t.lateCount));
                const width = (trend.lateCount / maxLate) * 100;
                return (
                  <div key={trend.date} className="flex items-center gap-3">
                    <p className="text-xs text-muted-foreground w-16 shrink-0">
                      {new Date(trend.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                    <div className="flex-1 h-4 bg-muted/50 rounded overflow-hidden">
                      <div
                        className="h-full rounded bg-warning transition-all"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <p className="text-xs font-medium w-10 text-right">{trend.lateCount}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Comparison</CardTitle>
          <p className="text-sm text-muted-foreground">
            Compare this week vs last week attendance
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">This Week</p>
              <p className="text-3xl font-semibold text-foreground">
                {Math.round(
                  attendanceTrends.slice(-7).reduce((sum, t) => sum + t.studentPercentage, 0) / 7
                )}
                %
              </p>
              <p className="text-xs text-muted-foreground mt-1">Student Avg</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">Last Week</p>
              <p className="text-3xl font-semibold text-foreground">
                {Math.round(
                  attendanceTrends.slice(0, 7).reduce((sum, t) => sum + t.studentPercentage, 0) / 7
                )}
                %
              </p>
              <p className="text-xs text-muted-foreground mt-1">Student Avg</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex items-center justify-center gap-2">
            {getTrendIcon(stats.weeklyStudentChange)}
            <span className={`text-sm font-medium ${getTrendColor(stats.weeklyStudentChange)}`}>
              {stats.weeklyStudentChange > 0 ? '+' : ''}{stats.weeklyStudentChange}% change from week start
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Daily Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">Student %</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">Staff %</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">Absentees</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">Late</th>
                </tr>
              </thead>
              <tbody>
                {attendanceTrends.map((trend) => (
                  <tr key={trend.date} className="border-b last:border-0">
                    <td className="py-2 px-3">
                      {formatAttendanceDate(trend.date)}
                      {trend.date === CURRENT_DATE && (
                        <span className="ml-2 text-xs text-primary font-medium">(Today)</span>
                      )}
                    </td>
                    <td className="text-right py-2 px-3">
                      <span
                        className={`font-medium ${
                          trend.studentPercentage >= 90
                            ? 'text-success'
                            : trend.studentPercentage >= 75
                            ? 'text-warning'
                            : 'text-destructive'
                        }`}
                      >
                        {trend.studentPercentage}%
                      </span>
                    </td>
                    <td className="text-right py-2 px-3">
                      <span
                        className={`font-medium ${
                          trend.staffPercentage >= 90
                            ? 'text-success'
                            : trend.staffPercentage >= 75
                            ? 'text-warning'
                            : 'text-destructive'
                        }`}
                      >
                        {trend.staffPercentage}%
                      </span>
                    </td>
                    <td className="text-right py-2 px-3">{trend.absenteeCount}</td>
                    <td className="text-right py-2 px-3">{trend.lateCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
