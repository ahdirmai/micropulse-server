#!/bin/bash
# Run this on Ubuntu server

set -e

APP_DIR="/var/www/microplus"
PORT=4001

echo "Setting up MicroPulse on port $PORT..."

# Create app directory
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Move files
echo "Moving files to $APP_DIR..."
cp -r .next public package.json package-lock.json next.config.ts $APP_DIR/
cd $APP_DIR

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Create .env.local
echo "Creating environment file..."
cat > .env.local << 'EOF'
# Supabase config
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Widget config
NEXT_PUBLIC_WIDGET_BASE_URL=https://micropulse.ahdirmai.id

# Next.js
PORT=4001
NODE_ENV=production
EOF

echo ""
echo "⚠️  IMPORTANT: Edit .env.local with your Supabase credentials:"
echo "   nano $APP_DIR/.env.local"
echo ""
read -p "Press Enter after editing .env.local..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'microplus',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    env: {
      PORT: 4001,
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
}
EOF

# Stop existing process if any
pm2 delete microplus 2>/dev/null || true

# Start with PM2
echo "Starting application on port $PORT..."
pm2 start ecosystem.config.js
pm2 save

# Setup PM2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

echo ""
echo "✅ MicroPulse deployed successfully!"
echo ""
echo "Status: pm2 status"
echo "Logs: pm2 logs microplus"
echo "Restart: pm2 restart microplus"
echo ""
echo "App running on: http://localhost:$PORT"
echo "Public URL: https://micropulse.ahdirmai.id"
echo ""
echo "Next steps:"
echo "1. Point Cloudflare subdomain to this port"
echo "2. Test: curl http://localhost:$PORT"
