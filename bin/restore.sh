#!/usr/bin/env bash

bin/manage.sh migrate
bin/manage.sh loaddata ../data/bible.json
bin/manage.sh loaddata ../data/user.json