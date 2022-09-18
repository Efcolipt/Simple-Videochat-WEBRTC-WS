import { useEffect, useState } from "react"

export default function useTheme() {
    const [theme, setTheme] = useState('')

    useEffect(() => {
        localStorage.setItem('theme-preference', theme)
        document.getElementsByTagName('body')[0].setAttribute('data-theme', theme)
    }, [theme])


    return [theme, setTheme]
}
