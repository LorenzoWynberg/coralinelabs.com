# Deployment Guide

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All code is committed to `main` branch
- [ ] `bun build` runs without errors locally
- [ ] All environment variables are documented
- [ ] Contact form has been tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed
- [ ] Images are optimized
- [ ] No console errors in browser
- [ ] Analytics/tracking code added (if applicable)
- [ ] Domain DNS configured (if custom domain)

---

## Vercel Deployment (Recommended)

Vercel is the recommended platform for Next.js applications, providing optimal performance and automatic deployments.

### Initial Setup

1. **Push code to GitHub:**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `coralinelabs.com` repository

3. **Configure Project:**

   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `bun run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `bun install`

4. **Add Environment Variables:**

   - Click "Environment Variables"
   - Add `RESEND_API_KEY` with your Resend API key
   - Select "Production", "Preview", and "Development"
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Visit provided URL to verify deployment

### Automatic Deployments

Once set up, Vercel automatically deploys:

- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches or pull requests

### Custom Domain

1. **Add Domain in Vercel:**

   - Go to Project Settings → Domains
   - Add your domain (e.g., `coralinelabs.com`)

2. **Configure DNS:**

   - Add A record pointing to Vercel's IP
   - Or add CNAME record pointing to `cname.vercel-dns.com`
   - Vercel provides specific instructions per domain

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - Usually ready within minutes

### Environment Variables Management

Update environment variables in Vercel:

1. Go to Project Settings → Environment Variables
2. Edit or add variables
3. Select environments (Production/Preview/Development)
4. Redeploy if needed

---

## Netlify Deployment

Alternative deployment platform with similar features.

### Setup

1. **Connect Repository:**

   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository

2. **Build Settings:**

   ```
   Base directory: (leave empty)
   Build command: bun run build
   Publish directory: .next
   ```

3. **Environment Variables:**

   - Go to Site Settings → Environment Variables
   - Add `RESEND_API_KEY`

4. **Deploy:**
   - Click "Deploy site"

### Custom Domain

1. Add domain in Domain Settings
2. Update DNS records as instructed
3. SSL auto-configured

---

## Railway Deployment

Full-stack platform with database support.

### Setup

1. **Install Railway CLI:**

```bash
npm i -g railway
```

2. **Login:**

```bash
railway login
```

3. **Initialize Project:**

```bash
railway init
```

4. **Add Environment Variables:**

```bash
railway variables set RESEND_API_KEY=your_key_here
```

5. **Deploy:**

```bash
railway up
```

---

## Cloudflare Pages

Deploy with Cloudflare's edge network.

### Setup

1. **Connect Repository:**

   - Go to Cloudflare Pages
   - Click "Create a project"
   - Connect GitHub repository

2. **Build Configuration:**

   ```
   Framework preset: Next.js
   Build command: bun run build
   Build output directory: .next
   ```

3. **Environment Variables:**

   - Add `RESEND_API_KEY` in Settings

4. **Deploy:**
   - Automatic on commit to main

---

## Self-Hosting with Docker

For custom infrastructure.

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM oven/bun:1 AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - RESEND_API_KEY=${RESEND_API_KEY}
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t coralinelabs-web .

# Run container
docker run -p 3000:3000 -e RESEND_API_KEY=your_key coralinelabs-web

# Or with docker-compose
docker-compose up -d
```

---

## VPS Deployment (Ubuntu)

Deploy to virtual private server.

### Prerequisites

- Ubuntu 20.04+ server
- Domain pointed to server IP
- SSH access

### Setup

1. **Install Bun:**

```bash
curl -fsSL https://bun.sh/install | bash
```

2. **Install Node.js (fallback):**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone Repository:**

```bash
cd /var/www
git clone https://github.com/LorenzoWynberg/coralinelabs.com.git
cd coralinelabs.com
```

4. **Install Dependencies:**

```bash
bun install
```

5. **Create Environment File:**

```bash
nano .env.local
```

Add:

```
RESEND_API_KEY=your_key_here
```

6. **Build Application:**

```bash
bun run build
```

7. **Install PM2:**

```bash
npm install -g pm2
```

8. **Start Application:**

```bash
pm2 start bun --name coralinelabs -- start
pm2 save
pm2 startup
```

### Nginx Configuration

Create `/etc/nginx/sites-available/coralinelabs`:

```nginx
server {
    listen 80;
    server_name coralinelabs.com www.coralinelabs.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/coralinelabs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d coralinelabs.com -d www.coralinelabs.com
```

---

## Environment Variables Reference

### Required

| Variable         | Description                       | Example            |
| ---------------- | --------------------------------- | ------------------ |
| `RESEND_API_KEY` | Resend API key for sending emails | `re_xxxxxxxxxxxxx` |

### Optional

| Variable   | Description      | Default      |
| ---------- | ---------------- | ------------ |
| `NODE_ENV` | Environment mode | `production` |
| `PORT`     | Server port      | `3000`       |

---

## Post-Deployment Verification

After deployment, verify:

1. **Site Loads:**

   - Visit production URL
   - Check all sections render

2. **Navigation:**

   - Test smooth scrolling
   - Verify mobile menu works

3. **Contact Form:**

   - Submit test form
   - Verify email delivery
   - Check error handling

4. **Performance:**

   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify image loading

5. **Mobile:**

   - Test on real devices
   - Check responsive breakpoints
   - Verify touch interactions

6. **Cross-Browser:**
   - Chrome, Firefox, Safari
   - Mobile browsers

---

## Monitoring & Maintenance

### Vercel Analytics

Enable in Vercel dashboard:

- Go to Project → Analytics
- View traffic, performance, and Web Vitals

### Error Tracking

Consider integrating:

- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Datadog](https://datadoghq.com) - Full monitoring

### Uptime Monitoring

Use services like:

- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)
- [Better Uptime](https://betteruptime.com)

### Regular Maintenance

- Update dependencies monthly: `bun update`
- Review error logs weekly
- Check security advisories
- Backup data if applicable
- Monitor performance metrics

---

## Rollback Procedure

### Vercel

1. Go to Deployments
2. Find previous successful deployment
3. Click three dots → "Promote to Production"

### Manual

1. Identify last working commit:

```bash
git log --oneline
```

2. Revert to commit:

```bash
git revert <commit-hash>
git push
```

3. Or reset (destructive):

```bash
git reset --hard <commit-hash>
git push --force
```

---

## Troubleshooting

### Build Fails

- Check build logs for errors
- Verify all dependencies are installed
- Ensure environment variables are set
- Run `bun run build` locally to reproduce

### 500 Server Error

- Check server logs
- Verify environment variables
- Check for runtime errors
- Verify Resend API key is valid

### Slow Performance

- Enable Vercel Edge Network
- Optimize images
- Check bundle size: `bun run build --analyze`
- Review Lighthouse suggestions

### Contact Form Not Working

- Verify `RESEND_API_KEY` is set correctly
- Check Resend API dashboard for errors
- Verify domain is verified in Resend
- Check rate limits

---

## Support

For deployment issues:

- Check platform documentation
- Review deployment logs
- Contact platform support
- Consult project maintainers
