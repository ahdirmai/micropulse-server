#!/bin/bash
# One-liner Docker deployment for Ubuntu server
# Usage: curl -sSL https://raw.githubusercontent.com/.../docker-deploy-oneliner.sh | bash

set -e

echo "🐳 MicroPulse Docker Deployment"
echo "================================"

# Install Docker if not exists
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose plugin
if ! docker compose version &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo apt update
    sudo apt install -y docker-compose-plugin
fi

# Create app directory
APP_DIR="/opt/microplus"
echo "📁 Setting up $APP_DIR..."
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR
cd $APP_DIR

# Extract uploaded tar
if [ -f /tmp/microplus-docker.tar.gz ]; then
    echo "📦 Extracting deployment package..."
    tar -xzf /tmp/microplus-docker.tar.gz
else
    echo "❌ Error: microplus-docker.tar.gz not found in /tmp/"
    echo "Upload it first: scp microplus-docker.tar.gz ahdirmai@ssh.ahdirmai.id:/tmp/"
    exit 1
fi

# Setup environment if not exists
if [ ! -f .env.local ]; then
    echo "⚙️  Creating .env.local..."
    cp .env.local.example .env.local

    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your Supabase credentials"
    echo "   nano $APP_DIR/.env.local"
    echo ""
    read -p "Press Enter after editing .env.local..."
fi

# Build and start
echo "🏗️  Building Docker image..."
docker compose build

echo "🚀 Starting container..."
docker compose down 2>/dev/null || true
docker compose up -d

# Wait for container to start
echo "⏳ Waiting for container..."
sleep 5

# Check status
if docker compose ps | grep -q "Up"; then
    echo ""
    echo "✅ MicroPulse deployed successfully!"
    echo ""
    echo "Status: docker compose ps"
    echo "Logs: docker compose logs -f microplus"
    echo "Stop: docker compose down"
    echo ""
    echo "App running at: http://localhost:4000"
    echo "Public URL: https://micropulse.ahdirmai.id"
    echo ""
    docker compose ps
else
    echo ""
    echo "❌ Container failed to start. Check logs:"
    echo "   docker compose logs microplus"
    exit 1
fi
