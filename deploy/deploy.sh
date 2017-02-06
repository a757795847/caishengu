#!/usr/bin/env bash

# 0. configuration
this_folder_path=deploy

project_directory=/opt/caishengu-web
service_name=caishengu-web

#source_directory=play-akka-tcp
server_directory=server

# zip name without '.zip'
zip_name=caishengu_web-1.0

remote_server=root@139.224.70.8

remote_server_password='1qazXSW2'

echo "current folder:"
pwd

# 1. compile
echo "============== start compiling =============="
sbt compile dist

# 2. unzip dist file

unzip -o -q -d /tmp/ target/universal/${zip_name}.zip

# 3. update file
echo "============== rsync copying =============="

sshpass -p ${remote_server_password} ssh ${remote_server} mkdir -p ${project_directory}/${server_directory}
sshpass -p ${remote_server_password} rsync -vr --delete --exclude=RUNNING_PID /tmp/${zip_name} ${remote_server}:${project_directory}/${server_directory}

echo "============== rsync copy complete =============="

# 4. restart service

# play framework script from http://buransky.com/play-framework/init-d-shell-script-for-play-framework-distributed-application/
sshpass -p ${remote_server_password} rsync -vr --ignore-existing ${this_folder_path}/dist-play-app-initd ${remote_server}:/etc/init.d/${service_name}
sshpass -p ${remote_server_password} ssh ${remote_server} chmod +x /etc/init.d/${service_name}

sshpass -p ${remote_server_password} ssh ${remote_server} service ${service_name} restart

# 5. delete temp file

rm -rf /tmp/${zip_name}

echo "============== update complete =============="
