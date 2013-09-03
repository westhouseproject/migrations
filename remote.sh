BNAME=`basename $(pwd)`

cd ..

PATH=$PATH:/usr/local/bin

export PATH

rm ~/repositories/$BNAME.tar.gz

rm -f ~/westhouse-bin/.migrate
mv ~/westhouse-bin/$BNAME/migrations/.migrate ~/westhouse-bin/.migrate
rm -rf ~/westhouse-bin/$BNAME

mv $BNAME ~/westhouse-bin
mv ~/westhouse-bin/.migrate ~/westhouse-bin/$BNAME/migrations

cd ~/westhouse-bin/$BNAME

env NODE_ENV=production ./node_modules/migrate/bin/migrate
