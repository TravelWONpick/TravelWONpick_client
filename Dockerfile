# 빌드 스테이지
FROM node:18 AS build
WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 파일 복사
COPY . .

# vite.config.js 확인
RUN cat vite.config.js

# 빌드 실행
RUN npm run build

# 실행 스테이지
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]