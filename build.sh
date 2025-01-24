#!/bin/bash

if [ -z $1 ]; then
  echo "No package specified"
  PWD=`pwd`
  if [[ $PWD =~ "packages/components" ]] || [[ $PWD =~ "packages/app" ]] || [[ $PWD =~ "packages/theme" ]]; then
    echo "Running build from ${PWD}"
  else 
    echo "Please run from a package or specify what package to build."
    exit
  fi
fi

if [[ $1 = "components" ]]; then
  cd packages/components
  echo "Building packages/components from:"
  pwd
fi
if [[ $1 = "app" ]]; then
  cd packages/app
  echo "Building packages/app from:"
  pwd
fi
if [[ $1 = "theme" ]]; then
  cd packages/theme
  echo "Building packages/theme from:"
  pwd
fi

npm run build &&
yalc push --replace --sig
