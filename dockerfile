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
COPY ./Backend ./

# Copy frontend build output into backend's public folder
COPY --from=frontend-builder /app/dist ./public

CMD ["node", "server.js"]
