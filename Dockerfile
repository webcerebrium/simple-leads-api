FROM node:11-alpine
COPY package*.json /app/
WORKDIR /app/
RUN npm install --only=production
COPY *.js /app/
COPY src/ /app/src/


# ENV SLACK_CHANNEL_URL
ENV DEBUG=*,-follow-redirects,-express:*,-body-parser:*
VOLUME /opt/leads
EXPOSE 8222
CMD ["node", "server.js"]