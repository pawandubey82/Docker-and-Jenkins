# Use Nginx web server
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files into Nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
