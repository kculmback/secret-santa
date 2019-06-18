FROM node:10.15.1

# Create app directory
WORKDIR /usr/src/app/

RUN apt-get -y update
RUN apt-get autoremove -y \
  && apt-get autoclean -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Building your code for production
RUN npm install


# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "run", "build" ]
