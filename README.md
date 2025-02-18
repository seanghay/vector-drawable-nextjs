<img width=72 height=72 src="public/apple-touch-icon.png">

## VectorDrawable to SVG Converter

This project is based on my library called [vector-drawable-svg](https://github.com/seanghay/vector-drawable-svg) and if you want to improve it, please open a pull request it will be merged as soon as possible.

## Hosting the project with Docker

<b>Grab the <a href="/docker-compose.yml">docker-compose.yml</a>  file and run</b>
```shell
docker compose up -d
```
<b>Without compose:</b>
```shell
docker run --restart unless-stopped -p 80:80 -d --name "vector-drawable" ghcr.io/seanghay/vector-drawable-nextjs:main
```

## Hosting the project bare metal

<b>Dev environment</b>
```shell
npm install
npm run dev
```
<b>Prod environment</b>
```shell
npm install
npm run build
npm run start
```

### Support

If you like this project, please become a stargazer by pressing the star button.

### License

MIT
