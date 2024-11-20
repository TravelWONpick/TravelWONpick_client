# 빌드 스테이지
FROM node:18 AS build

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY ../package*.json ./
RUN npm install

# 소스 파일 복사 (상위 디렉토리의 모든 필요한 파일)
COPY ../src ./src
COPY ../public ./public
COPY ../index.html .
COPY ../vite.config.js .

# vite.config.js 확인
RUN cat vite.config.js

# 빌드 실행
RUN npm run build

# 실행 스테이지
FROM nginx:alpine

# 빌드 결과물 복사 (vite.config.js의 outDir 설정에 따라)
COPY --from=build /app/build /usr/share/nginx/html

# nginx 설정 파일 복사 (docker 디렉토리 내부에 있으므로 상대 경로 수정)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
