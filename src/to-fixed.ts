import alasql from "alasql"

export const useToFixed = () => {
  alasql.fn.TO_FIXED = function (number, decimals) {
    if (typeof number !== "number" || typeof decimals !== "number") return 0;
    return Number(number.toFixed(decimals));
  };  
}