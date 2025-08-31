# ---- base deps ----
FROM node:20-alpine AS deps
WORKDIR /src
COPY package*.json ./
RUN npm ci --omit=dev


# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /src
ENV NODE_ENV=production

# Default starts the API; override with CMD to start signaling
CMD ["node", "/src/server.js"]
