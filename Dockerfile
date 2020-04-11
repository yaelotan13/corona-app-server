# Pull from a base image
FROM node:12-alpine

# Copy the files from the current directory to app/
COPY . app/

# Use app/ as the working directory
WORKDIR app/

# Install dependencies (npm ci is similar to npm i, but for automated builds)
RUN npm ci --only-production

# Listen on the specified port
EXPOSE 5000

ARG ENV
# Set Node server
ENTRYPOINT if [ "$ENV" = "production" ] ; then npm run deploy ; else npm start; fi 