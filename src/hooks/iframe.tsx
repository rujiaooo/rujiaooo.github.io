export function useInsideIframe(): [boolean, () => boolean] {
  const insideIframe = (): boolean => {
    try {
      return window.self !== window.top
    } catch (e) {
      return true
    }
  }
  const isInsideIframe = insideIframe()

  return [isInsideIframe, insideIframe]
}
