'use client'

import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'

interface IProvider {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams?: Record<string, string> | null
}

type TProviders = Record<string, IProvider>

const AuthProviders = () => {
  const [providers, setProviders] = useState<TProviders | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }

    fetchProviders()
  }, [])

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: IProvider, i) => (
          <button onClick={() => signIn(provider.id)} key={i}>
            {provider.id}
          </button>
        ))}
      </div>
    )
  }
}

export default AuthProviders
