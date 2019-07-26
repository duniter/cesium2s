#!/bin/sh

PWD=`pwd`
CMD="sudo docker run -ti --rm -p 8100:8100 -p 35729:35729 -v $PWD:/cesium2:rw cesium2:release"
echo "Executing: CMD"
$CMD