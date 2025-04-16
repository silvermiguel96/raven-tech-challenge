import xss from "xss";

export const sanitizeObject = (obj: Record<string, any>) => {
  const sanitized: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];
    sanitized[key] = typeof value === "string" ? xss(value) : value;
  }

  return sanitized;
};
