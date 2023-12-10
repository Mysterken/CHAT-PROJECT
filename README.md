# Installations

## Pre-requisites

- [Docker](https://docs.docker.com/get-docker/)
- [Make](https://www.gnu.org/software/make/) (optionnal)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mysterken/CHAT-PROJECT.git
```

### 2. Build the docker image

```bash
cd CHAT-PROJECT
make build
# or
docker build --pull --no-cache
```

### 3. Run the docker container

```bash
make up
# or
docker compose up
```

### 4. Open the application

Open your browser and go to [localhost](http://localhost)

# Testing in production

The application is deployed on [Aws](https://ec2-35-180-61-49.eu-west-3.compute.amazonaws.com/)  
If you want to test it, you can create an account or use the following credentials:

- email: `test@email.com`
- password: `test`

There is no web socket on the production server, so you will not be able to test the real time chat.  
Instead you will have to refresh the page to see the new incoming messages.
