import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) {
        setProgress(0)
        return
      }
      const currentScroll = window.scrollY
      setProgress(currentScroll / totalScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
