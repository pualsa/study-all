#!/bin/bash
# run this script in cygwin

# https://gist.github.com/Soarez/9688998

# password: changeit

###############################################################################
# Root CA
###############################################################################

echo Import the certificate into the truststore
"$JAVA_HOME/bin/keytool" -import -trustcacerts -alias projsignerca -file ProjSignerCA.crt -keystore proj-clients-gui.truststore -storepass changeit -noprompt 
