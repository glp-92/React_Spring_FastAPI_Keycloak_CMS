FROM python:3.10-slim
RUN useradd -ms /bin/bash fastapiuser
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
COPY ./app /app/app
RUN chown -R fastapiuser:fastapiuser /app
USER fastapiuser
CMD ["fastapi", "run", "app/main.py", "--proxy-headers", "--port", "8000"]