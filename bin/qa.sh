#!/usr/bin/env bash

ruff check backend --select I --fix
ruff format backend