FROM node:14

# set up angular cli
# RUN npm cache clean --force

RUN npm install @angular/cli@9.1.7

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install --no-package-lock
COPY . /app

# create watch files
CMD npm start
EXPOSE 4200