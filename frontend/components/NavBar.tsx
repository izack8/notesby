'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function NavBar() {

  const pathname = usePathname();
  const tabs = [
    { name: 'Home', path: `/` },
    { name: 'Topics', path: `/topic` },
    { name: 'Corpus', path: `/corpus` }
  ];

  return (
    <div className="flex gap-x-6">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.name}
            href={tab.path}
            className={`pb-2 font-medium text-lg border-b-2 transition-colors duration-200 ${
              isActive 
                ? 'border-blue-500 text-blue-500 ' 
                : 'border-transparent text-black hover:text-blue-500'
            }`}
          >
            {tab.name}
            
          </Link>
        );
      })}
    </div>
  );
}
