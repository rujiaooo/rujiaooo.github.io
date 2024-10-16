// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
import { ReportHandler } from "web-vitals"

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export function reportWebVitals (onPerfEntry?: ReportHandler) {
  if (!onPerfEntry) {
    return
  }

  if (!(onPerfEntry instanceof Function)) {
    return
  }
  
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(onPerfEntry)
    getFID(onPerfEntry)
    getFCP(onPerfEntry)
    getLCP(onPerfEntry)
    getTTFB(onPerfEntry)
  })
}