'use client'

import { AuthForm } from '@/components/features/auth/auth-form'

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back to FeedFlow
        </p>
      </div>
      <AuthForm type="login" />
    </div>
  )
}