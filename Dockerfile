# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Step 4: Install dependencies
RUN yarn install --frozen-lockfile

# Step 5: Copy the rest of the project files to the working directory
COPY . .

# Step 6: Build the Next.js application
RUN yarn build

# Step 7: Expose the port that Next.js will run on
EXPOSE 3000

# Step 8: Start the application
CMD ["yarn", "start"]
