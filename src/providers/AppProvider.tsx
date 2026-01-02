import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { config } from '@/config/wagmi'
import { queryClient } from '@/config/queryClient'
import { GlobalStyles } from '@/styles/GlobalStyles'
import '@rainbow-me/rainbowkit/styles.css'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#65b3ae',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
        >
          <GlobalStyles />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
