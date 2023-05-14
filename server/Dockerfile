# Installs Node.js image
FROM node:16.13.1-alpine3.14

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "authMiddleware.js", ".env", "query.js", "battle_calc.js", "bot_generator.js", "dictionary.js", "exp_calc.js", "helper.js", "items.js", "server.js", "tables.js", "tasks.js", "./"]

# Copies everything in the src directory to WORKDIR/src
# COPY ./images images

# Installs all packages
RUN npm install

# Runs the dev npm script to build & start the server
CMD npm run dev