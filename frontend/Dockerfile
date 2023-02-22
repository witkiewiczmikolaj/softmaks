FROM node:16.16.0
WORKDIR /

ENV PATH /node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
COPY public /public
COPY src /src
COPY node_modules /node_modules
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
RUN npm install react-select@5.7.0 -g --silent

CMD ["npm", "start"]
