FROM node:0.12.7
MAINTAINER Rogier Slag

RUN useradd --system --home /opt/zoopeeker zoopeeker

# Make the machine up to date and install some dependencies
RUN apt-get update && \
    apt-get install -y git curl && \
    apt-get autoremove -y && \
    apt-get clean

EXPOSE 8080

# Install bower
RUN npm install -g bower

# Add the dependencies
ADD . /opt/zoopeeker
RUN cd /opt/zoopeeker && npm install && bower install --allow-root && chown -R zoopeeker /opt/zoopeeker

# Run the entire thing!
WORKDIR /opt/zoopeeker

USER news-service

CMD ["node", "app.js"]

