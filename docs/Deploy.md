## Ubuntu Server Hardening

1. Update system and install basic utilities
```bash
sudo apt update -y
sudo apt upgrade -y
sudo apt dist-upgrade -y
sudo apt autoremove -y
sudo apt autoclean -y
sudo apt install net-tools -y
sudo apt install sysstat -y
```

2. Automatic upgrades
```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

3. Create non root user and add to sudo group
```bash
sudo adduser username
sudo usermod -aG  sudo username
sudo su - username
```

4. SSH
  - Generate a pair public/private key to add to the server => `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` => Accept all => Placed on `/home/usr/.ssh/id_rsa.pub`
  - Paste content on server
```bash
cd /home/username/.ssh
sudo nano authorized_keys
cat ~/.ssh/id_rsa.pub | ssh user@ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```
  - Need to edit these lines on /etc/ssh/sshd_config
```bash 
port xxx
PermitRootLogin No 
AddressFamily inet
PasswordAuthentication no
PermitEmptyPasswords no
X11Forwarding no
AllowTcpForwarding no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 0
PermitUserEnvironment yes ## CAUTION: only used when loading .env variables to create de init.sql file
```
  - `sudo systemctl restart sshd`

5. Fail2Ban utility => intrusion prevention system that monitors log files and ban suspicious IP addresses. 
- [Tutorial](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-20-04)
- [Tutorial 2](https://medium.com/@bnay14/installing-and-configuring-fail2ban-to-secure-ssh-1e4e56324b19)
- [Tutorial 3](https://mytcpip.com/fail2ban-ssh/)
```bash
sudo apt install fail2ban
sudo nano /etc/fail2ban/jail.conf
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```
Edit ssh section
```bash
[sshd]
enabled = true
port = xxx # Changed on sshd_config
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```
`sudo systemctl restart fail2ban`

6. UFW firewall
```bash
sudo ufw status # see installed
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow xxx/tcp # ssh port
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status verbose
```



## Docker hardening

1. Install docker
```bash
sudo apt-get update -y
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
sudo systemctl enable docker
sudo systemctl restart docker
```

2. Add non-root user (created on init) to docker group `sudo usermod -aG docker username`

3. Check docker security by running bench security utility
```bash 
git clone https://github.com/docker/docker-bench-security.git
cd docker-bench-security
sudo sh docker-bench-security.sh
```

### Utilities 

Delete all containers and volumes
```bash 
docker rm -vf $(docker ps -aq)
```
Delete all images 
```bash
docker rmi -f $(docker images -aq)
```
Build again images
```bash
docker compose up --build
```