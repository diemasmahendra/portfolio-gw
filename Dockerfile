FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY . .
CMD ["sh", "-c", "serve -s . -p ${PORT:-3000}"]
