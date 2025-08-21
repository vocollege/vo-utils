#!/bin/bash

if test -f package.json; then
  echo ""
else
  echo "Please run from a npm repo."
  exit
fi

echo "Removing yalc bindings"
yalc remove @vocollege/app
yalc remove @vocollege/components
yalc remove @vocollege/theme

echo "Removing @vocollege packages"
npm remove --force @vocollege/app
npm remove --force @vocollege/components
npm remove --force @vocollege/theme

echo "Reinstalling @vocollege packages"
npm install --force @vocollege/app
npm install --force @vocollege/components
npm install --force @vocollege/theme
