export const getEnvVar = (key: string) => {
    const value = process.env[key];
  
    if (value === undefined) {
      throw new Error(`Env var ${key} is not defined`);
    }
  
    return value;
  };
  