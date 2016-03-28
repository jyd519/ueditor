#!/usr/bin/env bash

grunt --server=jsp --encode=utf8

DIST_DIR=./dist/utf8-jsp

array=("$DIST_DIR/jsp" 
			 "$DIST_DIR/third-party/highcharts"
			 "$DIST_DIR/third-party/snapscreen"
			 )

for dir in ${array[*]}
do
	if [[ -e $dir ]]; then
		rm -rf $dir 
	fi
done

if [[ $1 = "deploy" ]]; then
  if [[ -e $DIST_DIR/ueditor.config.js ]]; then
    mv $DIST_DIR/ueditor.config.js $DIST_DIR/ueditor.config-example.js
  fi

  cp -r  $DIST_DIR/  ../sac/sac/WebContent/ueditor/
  cp -r  $DIST_DIR/  ../sac/sac_m/WebContent/ueditor/
fi
