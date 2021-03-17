FROM node:12.8.0-slim

WORKDIR /accountapi

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3002
CMD [ "npm", "start" ]