FROM nginx

COPY dist/ /usr/share/nginx/html/

COPY dist/assents/ /usr/share/nginx/html/assents/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
