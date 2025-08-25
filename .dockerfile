# Gunakan image Alpine yang ramping
FROM node:18-alpine

# Atur working directory
WORKDIR /app

# Copy manifest dan lockfile, minimal layer untuk install deps
COPY package.json yarn.lock ./

# Install hanya production dependencies
RUN npm install --production --frozen-lockfile

RUN npm run build 

# Copy hasil build dari lokal
COPY dist ./dist

# Port aplikasi, sesuaikan kalau Next.js pakai 3000
EXPOSE 3000

# Start command (NestJS: dist/main.js; Next.js: ganti sesuai start script)
CMD ["node", "dist/main.js"]