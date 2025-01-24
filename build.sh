#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [ -z $1 ]; then
  echo "No package specified"
  PWD=`pwd`
  if test -f package.json; then
    echo "Running build from ${PWD}"
  else 
      echo "Please run from a package or specify what package to build."
      exit
  fi
else 
  EXEC_DIR=${SCRIPT_DIR%%/}/packages/"$1"
  if [ -d $EXEC_DIR ]; then
    cd $EXEC_DIR
  else 
    echo "The package '${1}' could not be found in ${SCRIPT_DIR}/packages/"
    exit
  fi
  PACKAGE=packages/"$1"
  echo "Building ${PACKAGE} from:"
  pwd

fi

npm run build &&
yalc push --replace --sig
