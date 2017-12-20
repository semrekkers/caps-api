#!/bin/sh

set -e

# Initialize
git submodule update --recursive --remote

# Build Angular app
cd frontend
npm install
node_modules/@angular/cli/bin/ng build --prod
cd ..

# Build API
npm install --production