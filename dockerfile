# ---- Frontend build stage ----
FROM node:22-alpine AS frontend-builder

WORKDIR /app
COPY ./Frontend/package*.json ./
RUN npm install
COPY ./Frontend ./
RUN npm run build

# ---- Backend stage ----
FROM node:22-alpine AS backend

WORKDIR /app

# Install Chromium + dependencies for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Environment variable: skip Puppeteer’s own Chromium download
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY ./Backend/package*.json ./
RUN npm install

# Clean Puppeteer cache (avoid stale binaries)
RUN rm -rf /root/.cache/puppeteer

COPY ./Backend ./

# Copy frontend build output into backend's public folder
COPY --from=frontend-builder /app/dist ./public

# Default command
CMD ["node", "server.js"]
