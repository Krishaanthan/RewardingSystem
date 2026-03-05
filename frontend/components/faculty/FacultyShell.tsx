'use client';

import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function FacultyShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-faculty-bg">
      <Header />
      <Sidebar />
      <main
        className="min-h-screen bg-faculty-bg px-9 pb-9 pt-8"
        style={{ marginLeft: '230px', marginTop: '64px', padding: '32px 36px' }}
      >
        {children}
      </main>
    </div>
  );
}
