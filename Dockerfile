# Set the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
