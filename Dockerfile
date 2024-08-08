
####################
## Stage 1: Build ##
####################
FROM node:20.9.0-alpine AS deps-builder
RUN npm install -g pnpm@9.1.4
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
# # Override the prepare script in package.json
RUN sed -i '/"prepare":/d' package.json
RUN pnpm install
COPY . .

ENV NODE_ENV=production
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=aslkjgfhosdhfg7346524903wrhfkjhgf$#%k45*9*%^

RUN pnpm build
####################
## Stage 2: Build ##
####################
FROM node:20.9.0-alpine AS runner

ENV NODE_ENV=production
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=aslkjgfhosdhfg7346524903wrhfkjhgf$#%k45*9*%^

WORKDIR /app

COPY --from=deps-builder /app/next.config.js ./
COPY --from=deps-builder /app/.next/standalone ./
COPY --from=deps-builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
