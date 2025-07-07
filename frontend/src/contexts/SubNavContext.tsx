import React, { createContext, useContext, useState } from 'react'

interface SubNavContextType {
  hasSubNav: boolean
  setHasSubNav: (hasSubNav: boolean) => void
}

const SubNavContext = createContext<SubNavContextType | undefined>(undefined)

export const useSubNav = () => {
  const context = useContext(SubNavContext)
  if (!context) {
    throw new Error('useSubNav must be used within a SubNavProvider')
  }
  return context
}

export const SubNavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasSubNav, setHasSubNav] = useState(false)

  return (
    <SubNavContext.Provider value={{ hasSubNav, setHasSubNav }}>
      {children}
    </SubNavContext.Provider>
  )
}