# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install PDM
RUN pip install --no-cache-dir pdm

# Copy PDM project files from backend directory
COPY backend/pyproject.toml ./

# Configure PDM to not use virtual environment in container
ENV PDM_USE_VENV=false

# Install dependencies using PDM
RUN pdm install --prod --no-editable

# Install dependencies required for bridge script
RUN apt-get update && apt-get install -y curl ca-certificates gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g ts-node typescript \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install bridge NPM dependencies
COPY backend/bridges/package*.json ./bridges/
RUN cd bridges && npm install --omit=dev

# Copy the entire backend directory (Python sources and bridges)
COPY backend/ ./

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh && chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application using entrypoint (includes smoke test)
CMD ["docker-entrypoint.sh"] 