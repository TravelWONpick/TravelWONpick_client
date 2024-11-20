# Build stage
FROM node:20.17.0 as build
WORKDIR /app

# Copy and install package files
COPY package*.json ./
RUN npm install
COPY . .

# Run Build
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf  # 상대 경로로 수정
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
