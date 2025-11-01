---
title: "Network Hacking II - Week 3 Lab - SEC 450 - Liam Dale"
pubDate: "2025-10-14"
description: "Advanced network attacks including sudo privilege escalation, OSPF poisoning, and Docker container escapes"
category: lab
image: "/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_8_img_1.png"
tags: 
    - cybersecurity
    - lab
    - sec450
---

## Introduction

This writeup documents my work from an advanced network security lab at Bellevue College. I've broken down each vulnerability I discovered, including the exploitation process and remediation strategies. These labs really pushed my understanding of network security - hope my documentation shows that!

## Improper sudo privilege on hA (10.100.1.10) – CRITICAL
CWE-250, CVSS3.0 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H

## Summary

There was a misconfiguration discovered on the hA Jupyter Notebook server, where anyone logged into the Debian server could execute tcpdump without a password as root. This opens an unnecessary attack vector for attackers, anyone with an active connection to the Jupyter Notebook webserver and the password to enter could potentially elevate themselves to root.

## Steps To Reproduce

1. Login to Juypter Notebook webserver using password
2. Open a new terminal window
3. Type `sudo -l` to view the misconfiguration:
4. Craft a payload to create a root owned accessible and executable bash binary:
5. Use tcpdump to execute the script as root, generate traffic and wait so tcpdump executes:

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_2_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_2_img_2.png)

6. Run the new /bin/rootbash binary to enter a 'root' shell:
7. Spawn a new bash shell using 'fake root' privileges to enter a shell with actual root privileges:
8. Connect to rA using the SSH keys within /root/.ssh and read the flag:

## Remediation Steps

Steps from here will rank from usefulness:
1. Remove sudo configuration allowing unrestricted use of tcpdump as root by editing the /etc/sudoers file
2. Restrict usage of tcpdump to specific interfaces or by users who need access to the command.

## References

https://cwe.mitre.org/data/definitions/250.html
https://gtfobins.github.io/gtfobins/tcpdump/

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_3_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_3_img_2.png)

![Image 3](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_3_img_3.png)

![Image 4](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_3_img_4.png)

## Credential stealing possible from Health Check API server on hA (10.100.0.10) – CRITICAL
CWE-319, CVSS3.0 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H

## Summary

It was discovered that on hA users using tcpdump can listen in to our health check API @ port 5000 and capture credentials for root breaking AAA.

## Steps To Reproduce

1. Login to Juypter Notebook webserver using password
2. Open a new terminal window
3. Type `sudo -l` to view the misconfiguration:
4. Listen in on port 5000 for communication using tcpdump as root:
5. View plaintext credentials in communication to API server:

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_4_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_4_img_2.png)

6. Login as root using stolen credentials:
7. Connect to rA using the SSH keys within /root/.ssh and read the flag:

## Remediation Steps

Steps from here will rank from usefulness:
1. Enable TLS/SSL encryption on HTTP requests made to the port 5000 health check server to avoid credentials being sent over in plaintext.
2. Edit the /etc/sudoers file to remove the configuration allowing unrestricted use of tcpdump on the system.
3. Reimplement API health check to use API keys or a token based authentication instead of hardcoded credentials.

## References

https://cwe.mitre.org/data/definitions/319.html

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_5_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_5_img_2.png)

![Image 3](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_5_img_3.png)

## OSPF poisoning attack possible on 10.200.0.0/24 subnet – CRITICAL
CWE-940, CVSS3.0 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H

## Summary

There was a vulnerability discovered in the OSPF network on 10.200.0.0/24, an attacker if directly connected to the network or had gotten access to the network via one of the routers could potentially poison OSPF tables to intercept traffic coming from any subnet.

## Steps To Reproduce

1. Once logged into a router or device with routing capabilities, install tcpdump and frr.
2. Establish a connection with the OSPF network:
3. Create a listener using tcpdump on port 80 (the traffic we're trying to intercept):

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_6_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_6_img_2.png)

![Image 3](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_6_img_3.png)

4. Create 'fake' interfaces that appear to connect directly to the subnets we're targeting:
5. Advertise those routes using OSPF:
6. Wait and then read our capture for the SSH keys:

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_7_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_7_img_2.png)

7. Save and use the SSH keys to login to root on any device on the 10.0.0.0/8 network:
8. Login to netadmin @ 10.200.0.10 and read the key:

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_8_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_8_img_2.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Implement OSPF authentication to avoid unauthorized routers from joining the OSPF network.
2. Implement ACLs to ensure only trusted devices are allowed to communicate with routers on the network.
3. Enable passive interfaces on subnets that don't need OSPF to function.

## References

https://cwe.mitre.org/data/definitions/940.html

## Docker escape possible on netadmin (10.200.0.10) – CRITICAL
CWE-250, CVSS3.0 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H

## Summary

There was a vulnerability detected on the netadmin container located at 10.200.0.10 in the 10.0.0.0/8 network, which when abused allows a docker container to escape its environment and attack the host machine.

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_9_img_1.png)

## Steps To Reproduce

1. Logged into root on the netadmin box view the cgroup capabilities of this docker container using the capsh –print command:

Because we have the CAP_SYS_ADMIN capability we're allowed a lot of control over the host device!

2. View the disk devices directly connected to the container using lsblk:
3. Make a directory and mount the device in its entirety to that folder:

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_10_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_10_img_2.png)

4. View the contents and reveal the host operating system:
5. Find the flag in the /root/ folder of the host operating system:

![Image 1](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_11_img_1.png)

![Image 2](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_11_img_2.png)

![Image 3](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_11_img_3.png)

![Image 4](/writeups/network-hacking-ii-week-3-lab-sec-450-liam-dale/page_11_img_4.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Remove privileged capabilities from docker container when running or only allow specific capabilities for the task.
2. When running containers prevent access to the host disk devices.
3. Run the docker container as a non-root user.

## References

https://cwe.mitre.org/data/definitions/250.html
https://blog.trailofbits.com/2019/07/19/understanding-docker-container-escapes/
https://unit42.paloaltonetworks.com/container-escape-techniques/