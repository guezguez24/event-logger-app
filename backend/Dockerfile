FROM node:23-slim

WORKDIR /app

COPY . .

# Optional: Install build tools
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]