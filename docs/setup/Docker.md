# Setup

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

# Docker Hardening

1. Add non-root user (created on init) to docker group `sudo usermod -aG docker username`

2. Check docker security by running bench security utility
```bash 
git clone https://github.com/docker/docker-bench-security.git
cd docker-bench-security
sudo sh docker-bench-security.sh
```

# Docker Management Commands 

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