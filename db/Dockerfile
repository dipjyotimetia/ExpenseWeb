FROM mongo:3.6.21

COPY init.json /init.json

CMD mongoimport --uri mongodb://mongodb:27017/testdb --collection users --type json --file /init.json --jsonArray