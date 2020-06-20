FROM node:8

# set up angular cli
RUN npm install @angular/cli@9.1.7

WORKDIR /app
COPY package.json /app
COPY npm.lock /app
RUN npm install 
COPY . /app

# create watch files
CMD npm start
EXPOSE 4200