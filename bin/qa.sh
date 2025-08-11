#!/usr/bin/env bash

ruff check src --select I --fix
ruff format src