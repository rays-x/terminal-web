import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

const resolve = (p: string) => path.resolve(__dirname, p);

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production", hmrPort?: number) {
  const app = express();
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: hmrPort,
      },
    },
    appType: "custom",
    logLevel: isTest ? "error" : "info",
  });

  app.use(vite.middlewares);

  if (isProd) {
    app.use(compression());
    app.use(
      serveStatic(resolve("dist/client"), {
        index: false,
      }),
    );
  }
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;
    try {
      const template = await vite.transformIndexHtml(
        url,
        await fs.readFile(isProd ? resolve("dist/client/index.html") : resolve("index.html"), "utf-8"),
      );
      const productionBuildPath = path.join(__dirname, "./dist/server/entry-server.mjs");
      const devBuildPath = path.join(__dirname, "./src/entry-server.tsx");
      const { SSRRender } = await vite.ssrLoadModule(isProd ? productionBuildPath : devBuildPath);
      const appHtml = await SSRRender(url);
      const html = template.replace(`<!--app-html-->`, appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      console.error(e.stack);
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
  return { app, vite };
}

createServer().then(({ app }) => {
  const port = process.env.PORT || 7456;
  app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
});
