const set = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(`tend:${key}`, stringifiedValue)
}

const get = (key: string) => {
  const value = window.localStorage.getItem(`tend:${key}`) || null
  if (!value) {
    return null
  } else {
    return JSON.parse(value)
  }
}

const clear = () => {
  window.localStorage.clear()
}

export { set, get, clear }