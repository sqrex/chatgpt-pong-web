FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY pong.js /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]