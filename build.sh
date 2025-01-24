#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [ -z $1 ]; then
  echo "No package specified"
  PWD=`pwd`
  case $PWD in
    *"packages/components"* | *"packages/app"* | *"packages/theme"*)
      echo "Running build from ${PWD}";;
    *)
      echo "Please run from a package or specify what package to build."
      exit;;
  esac
fi

cd $SCRIPT_DIR

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
