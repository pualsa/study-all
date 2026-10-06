#!/bin/sh
# run this script in cygwin

# https://gist.github.com/Soarez/9688998

###############################################################################
# Server Cert
###############################################################################

CERTS_ROOT=../01-server-root
MAKER_HOME=../02-proj-server

echo Create private key for the proj-server.
openssl genrsa -des3 -passout pass:changeit -out proj-server.key 2048

echo Create CSR for the proj-server.
openssl req -new -out proj-server.csr -config proj-server.conf

echo Sign the server CSR
cd $CERTS_ROOT
openssl ca -config ./root-ca.conf -extfile $MAKER_HOME/proj-server.ext.conf -in $MAKER_HOME/proj-server.csr -out $MAKER_HOME/proj-server.crt
cd $MAKER_HOME

echo Export the server key and certificate signed by CA into a PKCS12 keystore
openssl pkcs12 -export -passout pass:changeit -in proj-server.crt -inkey proj-server.key -out proj-server.p12 -name proj -CAfile $CERTS_ROOT/ProjRootCA.crt -caname projrootca -chain

# https://www.wowza.com/docs/how-to-import-an-existing-ssl-certificate-and-private-key
# openssl pkcs12 -export -in [filename-certificate] -inkey [filename-key] -name [host] -out [filename-new-PKCS-12.p12]    

"$JAVA_HOME/bin/keytool" -importkeystore -srcstorepass changeit -srckeystore proj-server.p12 -srcstoretype PKCS12 -destkeystore proj-server.keystore -deststorepass changeit -deststoretype pkcs12
"$JAVA_HOME/bin/keytool" -import -alias projrootca -trustcacerts -file $CERTS_ROOT/ProjRootCA.crt -keystore proj-server.keystore -keypass changeit -storepass changeit -noprompt
