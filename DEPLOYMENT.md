# MicroPulse Deployment Guide

## Deploy to Ubuntu Server (Port 4001)

### Step 1: Build & Package (Local)
```bash
cd /Users/ahdirmai/Project/Microplus
./deploy-local.sh
```

Creates: `microplus-deploy.tar.gz`

### Step 2: Upload to Server
```bash
scp microplus-deploy.tar.gz ahdirmai@ssh.ahdirmai.id:/tmp/
```

### Step 3: Extract & Setup (On Server)
```bash
ssh ahdirmai@ssh.ahdirmai.id

cd /tmp
tar -xzf microplus-deploy.tar.gz
chmod +x server-setup.sh
./server-setup.sh
```

The script will:
1. Create `/var/www/microplus`
2. Install dependencies
3. Create `.env.local` template
4. Prompt you to edit Supabase credentials
5. Start app on port 4001 with PM2

### Step 4: Configure Environment (On Server)
```bash
nano /var/www/microplus/.env.local
```

Required values:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

### Step 5: Verify
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs microplus

# Test locally
curl http://localhost:4001
```

### Step 6: Point Cloudflare
Subdomain: `micropulse.ahdirmai.id`
Target: `localhost:4001` (via cloudflared tunnel)

## PM2 Commands
```bash
pm2 restart microplus    # Restart app
pm2 stop microplus       # Stop app
pm2 logs microplus       # View logs
pm2 monit                # Monitor resources
```

## Update Deployment
```bash
# Local
./deploy-local.sh
scp microplus-deploy.tar.gz ahdirmai@ssh.ahdirmai.id:/tmp/

# Server
ssh ahdirmai@ssh.ahdirmai.id
cd /tmp
tar -xzf microplus-deploy.tar.gz
cp -r .next /var/www/microplus/
pm2 restart microplus
```

## Troubleshooting
```bash
# Port already in use
sudo lsof -i :4001
sudo kill -9 <PID>

# Check app logs
pm2 logs microplus --lines 100

# Restart PM2
pm2 kill
pm2 resurrect
```
