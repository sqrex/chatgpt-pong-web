# Use a Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update \
    && apt-get install -y wget unzip \
    && rm -rf /var/lib/apt/lists/*

# Install pyjs and pyjsdl
RUN wget http://pyjs.org/releases/pyjs-0.8.1.tar.gz \
    && tar -xvzf pyjs-0.8.1.tar.gz \
    && mv pyjs-0.8.1 pyjs

RUN wget https://pyjsdl.googlecode.com/files/Pyjsdl-0.21.zip \
    && unzip Pyjsdl-0.21.zip -d pyjsdl \
    && cd pyjsdl/Pyjsdl-0.21 \
    && python setup.py install

# Copy the game file
COPY pong_game.py /app/pong_game.py

# Compile the game
RUN pyjsbuild pong_game.py

# Serve the game using Python's built-in server
CMD ["python", "-m", "http.server", "8080"]