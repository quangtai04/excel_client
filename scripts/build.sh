#build
npm run build

#delete old minigames.zip
rm -rf excel_client.zip

#delete old folder minigames
rm -rf excel_client

#rename folder
mv build excel_client

#zip build folder
zip -r excel_client.zip excel_client

#copy to server
scp excel_client.zip root@192.168.1.15:/root/webapps
