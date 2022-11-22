import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {resolve, join} from 'node:path';
import {createServer as createViteServer} from 'vite';

const toAbsolute = (p: string) => resolve(__dirname, p);

const template = readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');

const routesToPrerender = readdirSync(toAbsolute('src/routes')).filter(file => !file.includes(':')).map(file => {
  const name = file.replace(/\.ts$/, '');
  return name === 'home' ? `/` : `/${name}`;
});
(async () => {
  const vite = await createViteServer({
    appType: 'custom',
    logLevel: 'error'
  });
  const {SSRRender} = await vite.ssrLoadModule(join(__dirname, './dist/server/entry-server.mjs'));
  for (const url of routesToPrerender) {
    const appHtml = SSRRender(url);
    const html = template.replace(`<!--app-html-->`, appHtml);
    const filePath = `dist/client${url === '/' ? '/index' : url}.html`;
    writeFileSync(toAbsolute(filePath), html);
    console.log('pre-rendered:', filePath);
  }
  process.exit(0);
})();
