FROM bardakdev/nginx-brotli

WORKDIR /var/www
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/proxy.settings.conf /etc/nginx/proxy.settings.conf
COPY docker/nginx/options.request.conf /etc/nginx/options.request.conf
COPY docker/nginx/cloudflare /etc/nginx/cloudflare
COPY docker/nginx/conf.d/sites-available /etc/nginx/conf.d/sites-available
COPY dist/client /var/www/frontend-app/public
COPY dist/mm /var/www/frontend-mm/public
