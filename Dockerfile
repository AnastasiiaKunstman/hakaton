FROM node:20.9.0 as dist
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r dist /frontend_static/