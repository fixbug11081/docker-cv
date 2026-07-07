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

COPY ./Backend/package*.json ./
RUN npm install

# Clean Puppeteer cache to avoid ENOENT errors and reduce image size
RUN rm -rf /root/.cache/puppeteer

COPY ./Backend ./

# Copy frontend build output into backend's public folder
COPY --from=frontend-builder /app/dist ./public

CMD ["node", "server.js"]
