# Setup

1. Update system and install basic utilities
```bash
sudo apt update -y
sudo apt upgrade -y
sudo apt dist-upgrade -y
sudo apt autoremove -y
sudo apt autoclean -y
sudo apt install net-tools -y
sudo apt install sysstat -y
sudo apt install openssh-server -y
```

# Server Hardening

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
port xxx # change default port
PermitRootLogin No 
AddressFamily inet # only Ipv4
PasswordAuthentication no # only certs
PermitEmptyPasswords no # only certs
X11Forwarding no # disallow desktop forwarding
AllowTcpForwarding no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 0
PermitUserEnvironment no ## CAUTION: only "yes" when loading .env variables to create de init.sql file. Better fill fields with own db params
```
  - `sudo systemctl restart sshd`

5. Fail2Ban utility => intrusion prevention system that monitors log files and ban suspicious IP addresses by using `iptables`. 
- [Tutorial](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-20-04)
- [Tutorial 2](https://medium.com/@bnay14/installing-and-configuring-fail2ban-to-secure-ssh-1e4e56324b19)
- [Tutorial 3](https://mytcpip.com/fail2ban-ssh/)
```bash
sudo apt install fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.conf
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

6. UFW firewall. Default installed on `Ubuntu Server`. Abstraction of `iptables`
```bash
sudo ufw status # see installed
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow xxx/tcp # ssh defined port
sudo ufw allow http # port 80
sudo ufw allow https # port 443
sudo ufw enable
sudo ufw status verbose
```