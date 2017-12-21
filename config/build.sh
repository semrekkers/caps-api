#!/bin/sh

set -e

# Initialize
git submodule update --recursive --remote

# Build Angular app
cd frontend
npm install
node_modules/@angular/cli/bin/ng build --prod
mv dist ../dist
cd ..

# Build API
npm install --production

# Clean up
rm -rf frontend