FROM node:18.0-slim

WORKDIR /accountapi

COPY package*.json ./

RUN npm install --force
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3002
CMD [ "npm", "start" ]