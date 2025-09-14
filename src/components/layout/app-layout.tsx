'use client'

import { AuthGuard } from '@/components/features/auth/auth-guard'
import { BottomNavigation } from '@/components/layout/bottom-navigation'
import { Sidebar } from '@/components/layout/sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:w-64 md:overflow-y-auto md:bg-white md:border-r md:border-gray-200">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="md:pl-64">
          <div className="container mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </main>

        {/* Mobile bottom navigation */}
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      </div>
    </AuthGuard>
  )
}