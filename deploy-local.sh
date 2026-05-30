#!/bin/bash
# Run this on your local machine

set -e

echo "Building Next.js..."
npm run build

echo "Creating deployment package..."
tar -czf microplus-deploy.tar.gz \
  .next \
  public \
  package.json \
  package-lock.json \
  next.config.ts \
  server-setup.sh

echo "Package created: microplus-deploy.tar.gz"
echo ""
echo "Upload to server:"
echo "  scp microplus-deploy.tar.gz ahdirmai@ssh.ahdirmai.id:/tmp/"
echo ""
echo "Then SSH and run:"
echo "  ssh ahdirmai@ssh.ahdirmai.id"
echo "  cd /tmp && tar -xzf microplus-deploy.tar.gz"
echo "  chmod +x server-setup.sh"
echo "  ./server-setup.sh"
