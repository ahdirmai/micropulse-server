# Docker Deployment Guide

## Quick Deploy (Recommended)

### Step 1: Prepare Files
```bash
# Create deployment package
tar -czf microplus-docker.tar.gz \
  Dockerfile \
  docker-compose.yml \
  .dockerignore \
  next.config.js \
  package.json \
  package-lock.json \
  app \
  lib \
  public \
  .env.local.example

# Upload to server
scp microplus-docker.tar.gz ahdirmai@ssh.ahdirmai.id:/tmp/
```

### Step 2: On Ubuntu Server
```bash
ssh ahdirmai@ssh.ahdirmai.id

# Install Docker (if not installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt update
sudo apt install docker-compose-plugin -y

# Extract files
cd /opt
sudo mkdir -p microplus
sudo chown $USER:$USER microplus
cd microplus
tar -xzf /tmp/microplus-docker.tar.gz

# Setup environment
cp .env.local.example .env.local
nano .env.local  # Edit Supabase credentials

# Build and run
docker compose up -d --build

# Check logs
docker compose logs -f microplus
```

### Step 3: Verify
```bash
# Check container status
docker compose ps

# Test endpoint
curl http://localhost:4000

# View logs
docker compose logs microplus
```

## Docker Commands

### Start/Stop
```bash
docker compose up -d        # Start in background
docker compose down         # Stop and remove
docker compose restart      # Restart
```

### Logs & Debug
```bash
docker compose logs -f                 # Follow logs
docker compose logs microplus --tail 100  # Last 100 lines
docker exec -it microplus sh          # Shell access
```

### Update Deployment
```bash
# Upload new tar
scp microplus-docker.tar.gz ahdirmai@ssh.ahdirmai.id:/tmp/

# On server
cd /opt/microplus
tar -xzf /tmp/microplus-docker.tar.gz
docker compose up -d --build  # Rebuild and restart
```

### Cleanup
```bash
docker compose down --volumes  # Remove everything
docker system prune -a        # Clean unused images
```

## Cloudflare Tunnel Setup

Point `micropulse.ahdirmai.id` to `localhost:4000`

Via cloudflared config:
```yaml
tunnel: your-tunnel-id
credentials-file: /path/to/credentials.json

ingress:
  - hostname: micropulse.ahdirmai.id
    service: http://localhost:4000
  - service: http_status:404
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (secret)
- `NEXT_PUBLIC_WIDGET_BASE_URL` - Public widget URL

## Troubleshooting

### Port already in use
```bash
sudo lsof -i :4000
sudo kill -9 <PID>
docker compose down
docker compose up -d
```

### Container not starting
```bash
docker compose logs microplus
docker compose down
docker compose up  # Without -d to see errors
```

### Rebuild from scratch
```bash
docker compose down
docker system prune -a -f
docker compose up -d --build
```

## Production Checklist

- [ ] `.env.local` configured with real Supabase credentials
- [ ] Cloudflare subdomain pointing to port 4000
- [ ] Container running: `docker compose ps`
- [ ] Logs clean: `docker compose logs microplus`
- [ ] Endpoint accessible: `curl http://localhost:4000`
- [ ] Widget loads: Visit `https://micropulse.ahdirmai.id`
- [ ] Auto-restart enabled: `docker compose ps` shows `unless-stopped`
