import { calcule } from './calcule'
import { useSumTotal } from './sum-total'
import { useToFixed } from './to-fixed'
import { transform } from './transform'
import { Action, ActionCalcule, ActionTransform, Input } from './types'
 

const runFormula = (action: Action, input: Input) => {
  if (action.type === "use") {
    input[action.output.name] = [...input[action.input.name]]
  } else if (action.type === "transform") {
    input = transform(action as ActionTransform, input)
  } else if (action.type === "calcule") {
    input = calcule(action as ActionCalcule, input)
  }
  return input
}

export const formula = (actions: Action[], input: Input): Input => {
  useSumTotal()
  useToFixed()
  actions.forEach((action) => {
    input = runFormula(action, input)
  })
  return input
}
