import { readJsonFile } from "./utils.ts"

const routeJSON = readJsonFile('./data/route-data.json')
export const routeData = JSON.parse(routeJSON)
