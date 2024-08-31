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

Attackers will attemp to escalate privileges by exploiting misconfigurations or vulnerabilities found in running containers. To mitigate that, is important to make some configurations for [host](./Ubuntu-Server.md) and container runtime hardening.

1. :warning: Never expose `docker.sock` on any container like
  ```yaml
  volumes:
    - "/var/run/docker.sock:/var/run/docker.sock"
  ```

2. Set an unprivileged user for every container if possible
  1. On `Docker compose`
  ```yaml
  frontend:
    user: 1000:1000 # first normal non-root user
  ```
  2. On `Dockerfile`
  ```
  RUN useradd -ms /bin/bash newuser
  USER newuser
  ```
  3. Create / Edit `/etc/docker/daemon.json`
  ```json
  {
    "userns-remap": "default"
  }
  ```

3. Never user `--privileged` flag when running containers. If possible use `--cap-drop all` flag to remove all kernel capabilities to container and add required with `--cap-add xxx` flag

4. Prevent container escalation with `no-new-privileges` flag which prevent `setuid` and `setgid` binaries
  ```yaml
  frontend:
    security_opt:
      - no-new-privileges:true
  ```

5. Try to avoid usage of `docker0` network. Consider custom networking and subnetting

6. Use [AppArmor](https://apparmor.net/) to prevent external on internal threats

7. Limit resources for containers to avoid DoS attacks
  ```yaml
  nginx:
    deploy:
        resources:
          limits:
            cpus: '0.5'
            memory: 256M
          reservations:
            cpus: '0.25'
            memory: 128M
  ```
  or
  ```yaml
  nginx:
    mem_limit: 256m
    cpus: 0.5
  ```

8. Use `read-only` flag for a container to avoid writing or executing files on filesystem
  ```yaml
  frontend:
    read_only: true
  ```

9. Run docker in rootless mode

10. Use secrets for sensitive data

11. Use a container bench security scanner
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