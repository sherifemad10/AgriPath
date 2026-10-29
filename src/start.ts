import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { securityHeaders } from "./server/security";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    const result = await next();
    if (result instanceof Response) {
      const headers = new Headers(result.headers);
      for (const [k, v] of Object.entries(securityHeaders())) headers.set(k, v);
      return new Response(result.body, { status: result.status, statusText: result.statusText, headers });
    }
    return result;
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8", ...securityHeaders() },
    });
  }
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
