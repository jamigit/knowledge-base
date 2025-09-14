interface IconProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Icon({ name, size = 'md', className = '' }: IconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // TODO: Replace with proper icon system (Lucide, Heroicons, etc.)
  const icons: Record<string, string> = {
    home: '🏠',
    search: '🔍',
    source: '📡',
    settings: '⚙️',
    heart: '♥',
    'heart-outline': '♡',
    bookmark: '📖',
    'bookmark-outline': '📖',
    refresh: '🔄',
    plus: '➕',
    trash: '🗑️',
    edit: '✏️',
    check: '✓',
    close: '✕',
    menu: '☰',
    user: '👤',
    rss: '📡',
    web: '🌐',
    tag: '🏷️',
    note: '📝',
    export: '📤',
    import: '📥'
  }

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name] || '?'}
    </span>
  )
}