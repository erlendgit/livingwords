#!/usr/bin/env bash

set -e

if [[ ! -d "venv" ]]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
fi

set +e

if [[ -f ".env" ]]; then
  set -o allexport
  source .env
  set +o allexport
fi

source venv/bin/activate