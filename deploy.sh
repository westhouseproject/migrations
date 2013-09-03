BNAME=`basename $(pwd)`

echo "Local password might be needed."
sudo rm -rf /tmp/$BNAME

cd ..

cp -r $BNAME /tmp

cd /tmp

sudo rm -rf $BNAME/.git
sudo rm -f $BNAME/migrations/.migrate

tar czf $BNAME.tar.gz $BNAME

echo "Remote password might be needed."
scp $BNAME.tar.gz westhouse@west-house.no-ip.org:~/repositories/$BNAME.tar.gz

echo "Remote password might be needed."
ssh westhouse@west-house.no-ip.org "cd ~/repositories; tar -zxvf $BNAME.tar.gz; cd $BNAME; sh remote.sh"
