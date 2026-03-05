#!/bin/bash
# ==============================================================================
# NYALI CROSSFIT & GYM - FULL VPS DEPLOYMENT SCRIPT (APACHE)
# This script installs Docker, Apache, Certbot, clones the repo, builds the app,
# and configures SSL via Let's Encrypt for https://nyalicrossfitgym.com
# 
# Usage on fresh VPS: curl -sL https://raw.githubusercontent.com/Alee24/Nyali-Fitnes/master/deploy-apache.sh | bash
# Or upload and run: chmod +x deploy-apache.sh && ./deploy-apache.sh
# ==============================================================================
set -e

DOMAIN="nyalicrossfitgym.com"
EMAIL="info@nyalicrossfitgym.com"  # Update this to your actual email for SSL renewal alerts
APP_DIR="/var/www/ncg"
GIT_REPO="https://github.com/Alee24/Nyali-Fitnes.git"

echo "======================================================="
echo " Starting Full Deployment for $DOMAIN using Apache"
echo "======================================================="

# 1. Update system
echo -e "\n[1 / 8] Updating system packages..."
apt-get update -y
apt-get upgrade -y

# 2. Install prerequisites
echo -e "\n[2 / 8] Installing Git, Curl, Apache, and Certbot..."
apt-get install -y git curl apache2 certbot python3-certbot-apache

# Stop and disable Nginx if running to prevent port conflicts
if systemctl is-active --quiet nginx; then
    echo "Stopping and disabling Nginx to free up port 80 for Apache..."
    systemctl stop nginx
    systemctl disable nginx
fi

# Enable necessary Apache proxy modules
a2enmod proxy
a2enmod proxy_http
a2enmod headers
systemctl restart apache2

# 3. Install Docker & Docker Compose if not installed
echo -e "\n[3 / 8] Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
else
    echo "Docker is already installed."
fi

# Ensure docker compose plugin is available
apt-get install -y docker-compose-plugin

# 4. Clone or pull the repository
echo -e "\n[4 / 8] Fetching application code..."
if [ ! -d "$APP_DIR/.git" ]; then
    echo "Cloning repository into $APP_DIR..."
    rm -rf "$APP_DIR" 2>/dev/null || true
    git clone "$GIT_REPO" "$APP_DIR"
else
    echo "Repository already exists at $APP_DIR. Pulling latest changes..."
    cd "$APP_DIR"
    git fetch --all
    git reset --hard origin/master
    git pull origin master
fi

cd "$APP_DIR"

# 5. Build and Restart Docker Containers
echo -e "\n[5 / 8] Building and starting Docker container (prod profile)..."
# Stop existing container if any
docker compose --profile prod down 2>/dev/null || true
# Clean up unused images to save space
docker system prune -f
# Rebuild from scratch and start
docker compose --profile prod build --no-cache
docker compose --profile prod up -d

# 6. Configure Apache Proxy
echo -e "\n[6 / 8] Configuring Apache for $DOMAIN..."
APACHE_CONF="/etc/apache2/sites-available/$DOMAIN.conf"

cat > "$APACHE_CONF" <<EOF
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias www.$DOMAIN

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:8562/
    ProxyPassReverse / http://127.0.0.1:8562/

    ErrorLog \${APACHE_LOG_DIR}/${DOMAIN}_error.log
    CustomLog \${APACHE_LOG_DIR}/${DOMAIN}_access.log combined
</VirtualHost>
EOF

# Enable the site and reload Apache
a2ensite "$DOMAIN.conf"
systemctl reload apache2

# 7. Configure SSL with Certbot
echo -e "\n[7 / 8] Obtaining SSL Certificate via Let's Encrypt..."
if certbot certificates | grep -q "$DOMAIN"; then
    echo "SSL Certificate already exists for $DOMAIN."
else
    echo "Running Certbot to get new certificate..."
    certbot --apache -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect || echo "Certbot failed. Ensure your DNS A record points to this VPS's IP."
fi

# 8. Finish
echo -e "\n[8 / 8] Deployment Complete!"
echo "Your app should now be running at: https://$DOMAIN"
echo "Note: If SSL failed, please ensure your domain DNS points to this server's public IP Address, then run: certbot --apache -d $DOMAIN -d www.$DOMAIN"
