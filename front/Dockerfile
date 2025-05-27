# 빌드 단계
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# 배포 단계
FROM node:18-slim
WORKDIR /app

# 정적 서버 설치
RUN npm install -g serve

# 빌드된 정적 파일 복사
COPY --from=builder /app/dist ./dist

# serve 설정 추가 (라우팅 fallback)
COPY serve.json ./

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000", "--single"]