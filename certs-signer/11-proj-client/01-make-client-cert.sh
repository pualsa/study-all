#!/bin/sh
# run this script in cygwin

# https://gist.github.com/Soarez/9688998

###############################################################################
# Client Cert
###############################################################################

CERTS_ROOT=../10-proj-signer
MAKER_HOME=../11-proj-client

echo Create private key for the client.
openssl genrsa -des3 -passout pass:changeit -out client-$1.key 2048

echo Create CSR for the client.
openssl req -new -key client-$1.key -out client-$1.csr -subj "/C=CH/ST=Zug/L=Zug/O=My Org/OU=Development/CN=$1" 

echo Sign the client CSR
cd $CERTS_ROOT
openssl ca -days 365 -config ./signer-ca.conf -extfile $MAKER_HOME/client.ext.conf -in $MAKER_HOME/client-$1.csr -out $MAKER_HOME/client-$1.crt
cd $MAKER_HOME

echo Export the client key and certificate signed by CA into a PKCS12 keystore
openssl pkcs12 -export -passout pass:changeit -in client-$1.crt -inkey client-$1.key -out client-$1.p12 -name $1 -CAfile $CERTS_ROOT/ProjSignerCA.crt -caname projsignerca -chain

# import a client PKI into a client's keystore
"$JAVA_HOME/bin/keytool" -importkeystore -srcstorepass changeit -srckeystore client-$1.p12 -srcstoretype PKCS12 -destkeystore client-$1.keystore -deststorepass changeit -deststoretype pkcs12
