import { readFile, writeFile } from "node:fs/promises"

const configPath = new URL("../src/assets/analytics-config.js", import.meta.url)
const measurementId = process.env.GA_MEASUREMENT_ID?.trim() ?? ""

if (measurementId && !/^G-[A-Z0-9]+$/.test(measurementId)) {
  throw new Error("GA_MEASUREMENT_ID must look like G-XXXXXXXXXX")
}

const source = await readFile(configPath, "utf8")
const configured = source.replace(
  /googleAnalyticsMeasurementId: "[^"]*"/,
  `googleAnalyticsMeasurementId: "${measurementId}"`,
)

await writeFile(configPath, configured)
console.log(
  measurementId
    ? `Configured Google Analytics ${measurementId}`
    : "Google Analytics remains disabled (no measurement ID configured)",
)
