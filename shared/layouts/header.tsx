'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, Menu, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { navGroups } from '@/shared/mock-data/navigation';

interface HeaderProps {
  onMenuClick: () => void;
}

function getBreadcrumb(pathname: string) {
  if (pathname === '/') return [{ label: 'Dashboard', href: '/' }];
  const allItems = navGroups.flatMap((g) => g.items);
  const match = allItems.find(
    (item) => item.href !== '/' && pathname.startsWith(item.href)
  );
  if (!match) return [{ label: 'Dashboard', href: '/' }];
  return [
    { label: 'Dashboard', href: '/' },
    { label: match.label, href: match.href },
  ];
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const crumbs = getBreadcrumb(pathname);

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <nav className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, idx) => (
          <div key={crumb.href} className="flex items-center gap-1.5">
            {idx > 0 && (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <Link
              href={crumb.href}
              className={
                idx === crumbs.length - 1
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground hover:text-foreground transition-colors'
              }
            >
              {crumb.label}
            </Link>
          </div>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students, staff, records..."
            className="w-64 pl-9 bg-background"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-destructive border-2 border-card">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-2.5 border-l border-border pl-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              AK
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:block leading-tight">
            <p className="text-sm font-medium text-foreground">Anita Kapoor</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
