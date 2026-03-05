import type { ReactNode } from 'react';
import { League_Spartan, Archivo_Black } from 'next/font/google';
import { FacultyShell } from '@/components/faculty/FacultyShell';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
});

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
});

export default function FacultyLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${leagueSpartan.variable} ${archivoBlack.variable}`}>
      <FacultyShell>{children}</FacultyShell>
    </div>
  );
}
