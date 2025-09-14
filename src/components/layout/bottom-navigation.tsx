'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

const navigation = [
  {
    name: 'Feed',
    href: '/feed',
    icon: '🏠'
  },
  {
    name: 'Sources',
    href: '/sources',
    icon: '📡'
  },
  {
    name: 'Search',
    href: '/search',
    icon: '🔍'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: '⚙️'
  },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/feed' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              )}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}