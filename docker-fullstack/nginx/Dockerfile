FROM nginx
# Overwrite the nginx default.conf with MY default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
# Creating a default.conf for production is ideal, however it's ok to just leave this as it is
# (to remove the websocket related part in default.conf)