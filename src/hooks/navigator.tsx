export function useNavigator() {

  function hasNavigator(): boolean {
    return navigator !== undefined && navigator !== null 
  }

  function isAgent(agent: string): boolean {
    if (!hasNavigator()) {
      return false
    }
    return agent === navigator.userAgent
  }

  function isInternalCrawler(): boolean {
    if (!hasNavigator()) {
      return false
    }
    return navigator.userAgent === "ReactSnap"
  }

  return {
    isAgent,
    isInternalCrawler
  }
}