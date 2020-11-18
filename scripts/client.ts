import { envVar, error } from "@therockstorm/utils"
import { Client } from "dwolla-v2"

export default new Client({
  environment: "sandbox",
  key: envVar("DWOLLA_APP_KEY"),
  secret: envVar("DWOLLA_APP_SECRET"),
})

export const handleError = async (func: () => any) => {
  try {
    return await func()
  } catch (e) {
    error(JSON.stringify(e, null, 2))
  }
}
