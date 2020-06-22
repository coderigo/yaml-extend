# YAML-extend

Crude support for any YAML file a la [gitlab-ci](https://docs.gitlab.com/ee/ci/yaml/#extends)

## build

npm install && npm run build

## Use

See `test` directory

## Test locally

```bash
# build and then...
./yaml-extend ./test/main.extends.yml
```

## Build

```bash
docker run --rm -it -v $(pwd):/tmp --workdir /tmp node:10 npm run build
```

## Download binary

```bash
wget -O yaml-extend https://raw.githubusercontent.com/coderigo/stata-git/master/yaml-extend
```