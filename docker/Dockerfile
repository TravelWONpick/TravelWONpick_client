# 빌드 스테이지
FROM node:20.17.0 AS build
WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 파일 복사
COPY . .

# 빌드 실행
RUN npm run build

# 실행 스테이지
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]