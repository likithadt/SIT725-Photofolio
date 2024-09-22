# # Use an official Node.js runtime as a parent image
# FROM node

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json files first to install dependencies
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code into the container
# COPY . .

# # Expose the port that your app runs on
# EXPOSE 3000

# # Command to run the app
# CMD ["npm", "start"]

# Use an official Node.js runtime as a parent image
FROM node

# Create a non-root user and set ownership
RUN mkdir -p /home/node && chown -R node:node /home/node

# Set the working directory inside the container
WORKDIR /usr/src/app

# Change to the non-root user
USER node

# Copy package.json and package-lock.json files first to install dependencies
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY --chown=node:node . .

# Expose the port that your app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]