FROM node:18 as builder

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

RUN npm run build

# Serve the app directly with vite (for debugging purposes)
FROM node:18

WORKDIR /app

COPY --from=builder /app/dist /app

# Install serve to serve the app
RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
