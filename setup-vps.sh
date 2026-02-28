#!/bin/bash

# Nyali Crossfit & Gym - VPS Deployment Script
# Developed by | KKDES "https://kkdes.co.ke/"

echo "🚀 Starting deployment for Nyali Fitness..."

# 1. Update and Install Dependencies
echo "📦 Updating system and installing Docker..."
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common apache2

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-compose-plugin
fi

# 2. Enable Apache Modules for Reverse Proxy
echo "🔧 Configuring Apache modules..."
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod ssl

# 3. Create Apache Virtual Host (The 'vhost')
DOMAIN="ncg.kkdes.co.ke"
echo "🌐 Creating Apache Virtual Host for $DOMAIN..."
VHOST_CONF="/etc/apache2/sites-available/$DOMAIN.conf"

sudo bash -c "cat > $VHOST_CONF" <<EOF
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias www.$DOMAIN

    ProxyPreserveHost On
    ProxyPass / http://localhost:9652/
    ProxyPassReverse / http://localhost:9652/

    ErrorLog \${APACHE_LOG_DIR}/$DOMAIN-error.log
    CustomLog \${APACHE_LOG_DIR}/$DOMAIN-access.log combined
</VirtualHost>
EOF

# Enable the site and restart Apache
sudo a2ensite $DOMAIN.conf
sudo systemctl restart apache2

# 4. Starting the App via Docker (Production Mode)
echo "🐳 Building and starting Docker containers (Production)..."
# Build and run the 'prod' profile defined in docker-compose.yml
sudo docker compose --profile prod up -d --build

echo "✅ Deployment complete!"
echo "📍 Your app is now live at http://$DOMAIN (proxying to Docker port 9652)"
echo "🔐 Note: Remember to run 'sudo certbot --apache -d $DOMAIN' for SSL."
