import alasql from "alasql"

export const useSumTotal = () => {
  alasql.fn.SUM_TOTAL = function () {
    let total = 0
    for (const arg of arguments) {
      if (arg) {
        total += Number(arg)
      }
    }
    return total
  }
}