# YAML-extend

Crude support for any YAML file a la [gitlab-ci](https://docs.gitlab.com/ee/ci/yaml/#extends)

## build

npm install && npm run build

## Use

See `test` directory

## Test locally

```bash
docker-compose build
docker run --rm -v $(pwd)/test:/tmp coderigo/yaml-extend:1.0.0 main.extends.yml
```

## Build

```bash
docker-compose build
```

## Running

```bash
docker run --rm -v $(pwd)/test:/tmp coderigo/yaml-extend:latest yourfile.extends.yml
```
