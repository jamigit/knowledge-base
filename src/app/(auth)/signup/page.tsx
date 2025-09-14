'use client'

import { AuthForm } from '@/components/features/auth/auth-form'

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Join FeedFlow to start following your favorite sources
        </p>
      </div>
      <AuthForm type="signup" />
    </div>
  )
}