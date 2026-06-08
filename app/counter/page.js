import Counter from '@/component/Counter/Counter'
import { ThemeProvider } from '@/component/Theme/ThemeProvider'
import ThemeToggle from '@/component/Theme/ThemeToggle'

export default function CounterPage() {
    return (
        <ThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', padding: 24, minHeight: '100vh' }}>
                <ThemeToggle />
                <Counter />
            </div>
        </ThemeProvider>
    )
}
