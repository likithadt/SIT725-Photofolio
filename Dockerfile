# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]