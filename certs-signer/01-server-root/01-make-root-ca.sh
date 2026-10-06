#!/bin/bash
# run this script in cygwin

# https://gist.github.com/Soarez/9688998

# password: changeit
    

###############################################################################
# Root CA - create once and keep it safe
###############################################################################

echo Generate a key for your Root CA
openssl genrsa -out ProjRootCA.key 2048

echo Create a self-signed certificate for our CA, this certificate will be used to sign and issue other certificates
openssl req -new -x509 -days 3650 -key ProjRootCA.key -out ProjRootCA.crt -subj "/C=CH/ST=Zug/L=Zug/O=My Org/OU=Development/CN=Proj Root CA/emailAddress=alexei.sadovnikov@proj.com"
