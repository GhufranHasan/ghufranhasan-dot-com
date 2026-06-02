'use client'

import { ModalProvider } from '@/contexts/ModalContext'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}
