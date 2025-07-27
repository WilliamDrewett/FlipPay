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

# Copy the entire backend directory
COPY backend/ ./

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application using PDM
CMD ["pdm", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 