#!/usr/bin/bash
# filename="$1"
# comm=$(ls *.ts)
# while read -r line; do
# 	path=$(pwd)
# 	name="${path}/${line}"
#    # echo "Name read from file - $name"
# done < "$1" 

# for line in $comm;do
#      echo "Files: $line"
#      fullpath=$(pwd) # get the full path of the file to be moved 
#      dir="${fullpath}/public" #Absolute path of file to be moved in
#      echo "Full path: $dir"
#      #chmod +x $line $dir
#      mv $line $dir
#      if [[ $? -ne 0  ]]; then
#          echo "Error Occur"
#      fi    
#      echo "passed"

# done
echo "
******** This will move all files from one directory to another directory ************

                1.pdf's: movepdfs        e.g: movePdfs /source  /destination
                2.ppt's: movePPt       e.g  movePPT  /source  /destination 
                
                
                  "
movepdfs () {
    src=$1
    dest=$2
    if [[ $# -eq 2 ]]; then           
        if [[ -d $src && -d $dest ]]; then  # check if given path exist or not
             echo "Source file: $src and destination directory: $dest"
             current_pwd=$(pwd)
             cd $src  # change directory to the source file
             echo "Pdf in $src are: $(ls *.pdf)"
             chmod +x $src # permission for moving the file
             mv *.pdf  $dest  # move all pdf files to the given destination
             cd /
             cd $current_pwd  # back to where we were
        fi
        else
            echo "given path do not exist
             exiting the program............."
        fi

    fi 
    else 

    fi 
}