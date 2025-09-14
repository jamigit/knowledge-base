'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

const navigation = [
  {
    name: 'Feed',
    href: '/feed',
    icon: '🏠',
    description: 'Your article feed'
  },
  {
    name: 'Sources',
    href: '/sources',
    icon: '📡',
    description: 'Manage your sources'
  },
  {
    name: 'Search',
    href: '/search',
    icon: '🔍',
    description: 'Search articles'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: '⚙️',
    description: 'App settings'
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-xl font-bold text-gray-900">Knowledge Base</h1>
      </div>

      <nav className="mt-8 flex-1">
        <div className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/feed' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500">
          © 2024 Knowledge Base
        </div>
      </div>
    </div>
  )
}