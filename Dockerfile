FROM node:10

COPY ./ /tmp/build
WORKDIR /tmp/build
RUN npm run build \
    && mv yaml-extend /bin/yaml-extend \
    && chmod +x /bin/yaml-extend \
    && cd ../ \
    && rm -rf /tmp/build
WORKDIR /tmp

ENTRYPOINT [ "/bin/yaml-extend" ]