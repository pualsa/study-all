#!/bin/bash
# run this script in cygwin

# https://gist.github.com/Soarez/9688998

# password: changeit

###############################################################################
# Root CA
###############################################################################

echo Import the root certificate into the truststore or cacerts
"$JAVA_HOME/bin/keytool" -import -trustcacerts -alias projrootca -file ProjRootCA.crt -keystore ProjRootCA.truststore -storepass changeit

# import ProjRootCA.crt into the browser
