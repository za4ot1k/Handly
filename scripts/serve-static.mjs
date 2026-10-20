import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

// Serve the exported files without an application server or SPA fallback.
const root = path.resolve('out');
const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
const basePath = html.match(/src="([^"?]*)\/_next\//)?.[1] || '';
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (basePath && pathname === basePath) {
      res.writeHead(308, { Location: `${basePath}/${url.search}` }).end();
      return;
    }
    if (basePath && !pathname.startsWith(`${basePath}/`)) {
      res.writeHead(404).end('Not found');
      return;
    }
    const file = path.resolve(root, `.${pathname.slice(basePath.length)}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403).end();
      return;
    }
    const stat = await fs.stat(file);
    if (stat.isDirectory() && !pathname.endsWith('/')) {
      res.writeHead(308, { Location: `${pathname}/${url.search}` }).end();
      return;
    }
    const target = stat.isDirectory() ? path.join(file, 'index.html') : file;
    const data = await fs.readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await fs.readFile(path.join(root, '404.html')).catch(() => 'Not found'));
  }
}).listen(port, '127.0.0.1', () => console.log(`Static preview: http://localhost:${port}${basePath}/`));
