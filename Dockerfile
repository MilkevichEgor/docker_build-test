FROM node:18-alpine
WORKDIR /
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
# COPY ./ ./
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]