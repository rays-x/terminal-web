curl -o brotli.Dockerfile https://raw.githubusercontent.com/nginxinc/docker-nginx/master/modules/Dockerfile.alpine; \
docker buildx build --platform linux/amd64 --build-arg ENABLED_MODULES="brotli ndk lua" -t bardakdev/nginx-brotli -f brotli.Dockerfile . --no-cache; \
docker push bardakdev/nginx-brotli; \
rm -f brotli.Dockerfile;
