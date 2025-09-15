export const debounce = <Args extends unknown[]>(
    func: (...args: Args) => void,
    wait: number
): ((...args: Args) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null
    return (...args: Args) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func(...args)
        }, wait)
    }
}
