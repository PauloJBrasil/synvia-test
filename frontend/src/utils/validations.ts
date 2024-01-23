/* eslint-disable @typescript-eslint/no-explicit-any */
export const isTruthy = (value: any) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
  
    return value !== undefined && value !== null && value !== "";
  };
  