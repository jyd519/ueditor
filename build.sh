#!/usr/bin/env bash

grunt --server=jsp --encode=utf8

array=("./dist/utf8-jsp/jsp" 
			 "./dist/utf8-jsp/third-party/highcharts"
			 "./dist/utf8-jsp/third-party/snapscreen"
			 )

for dir in ${array[*]}
do
	if [[ -e $dir ]]; then
		rm -rf $dir 
	fi
done

if [[ -e ./dist/utf8-jsp/ueditor.config.js ]]; then
	# mv ./dist/utf8-jsp/ueditor.config.js ./dist/utf8-jsp/ueditor.config-example.js
fi

