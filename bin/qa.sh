#!/usr/bin/env bash

ruff check backend --fix
ruff format backend

cd frontend
npm run format