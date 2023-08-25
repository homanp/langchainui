# langchain-api

## Installation

- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

### Backend

Copy `.env.example` and fill out the values.

Run the following command
```sh
make build
# if your os does not support makefile
docker-compose build
```

```sh
make run
# if your os does not support makefile
docker-compose up
```

Visit the following URL on your browser.
`http://0.0.0.0:8000`
