---
title: "Network Hacking I - Week 2 Lab - SEC 450 - Liam Dale"
pubDate: "2025-10-07"
description: "Exploiting authentication bypass, RCE, and privilege escalation vulnerabilities in network services"
category: lab
image: "/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_6_img_2.png"
tags: 
    - cybersecurity
    - lab
    - sec450
---

## Introduction

Hey there! This writeup comes from my ethical hacking coursework at Bellevue College. I've documented my findings and methodology here to demonstrate both my technical skills and ability to communicate complex security concepts clearly.

## Bypass Authentication Vulnerability on primo.ethicalhacking.academy – CRITICAL
CWE-287, CVSS3.0 9.1:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N
CVE-2018-10933

## Summary

A service [libssh 0.8.1] being hosted on the server primo.ethicalhacking.academy is vulnerable to authentication bypass allowing access to the root shell of the system.

## Steps To Reproduce

1. After an initial nmap service scan on the host, libssh 0.8.1 was identified as a service of interest.
2. Searching online reveals libssh 0.8.1 to have a known exploit, CVE-2018-10933.

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_2_img_1.png)

3. Searching up the CVE reveals python code which could be used to abuse the exploit.
4. Upon downloading the script and setting up the environment, I provided the IP address of the server and the libssh port and ran the script, immediately getting shell.

## Remediation Steps

Steps from here will rank from usefulness:
1. Patch / upgrade the system, versions of libssh < 0.8.4 will have this exploit patched.
2. Switch to equivalent software like OpenSSH
3. Limit exposure & surface area with firewalls, ACLs or a host-based firewall like iptables or ufw [port 10022]

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_3_img_1.png)

![Image 2](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_3_img_2.png)

## References

https://nvd.nist.gov/vuln/detail/cve-2018-10933
https://gist.github.com/mgeeky/a7271536b1d815acfb8060fd8b65bd5d

## RCE Vulnerability on oldschool.ethicalhacking.academy – CRITICAL
CWE-94, CVSS3.0 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
CVE-2016-5734

## Summary

A webservice being hosted on oldschool.ethicalhacking.academy was found to be vulnerable with an exploit which allows remote code execution, ostensibly allowing a user shell on the system.

## Steps To Reproduce

1. After an initial nmap service scan on the host, the three webservers were of interest to investigate.
2. Visiting 172.16.90.125:8080 revealed a phpMyAdmin server

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_4_img_1.png)

3. Visiting 172.16.90.125:8080 revealed a ZABBIX server
4. Investigating phpMyAdmin further I clicked on this button on the login page, which took me to this page.

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_5_img_1.png)

![Image 2](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_5_img_2.png)

5. Now that I had the version number of one of the services I searched online (with the help of the prof.), which revealed CVE-2016-5734 as a potential exploit.
6. Searching online for an exploit reveals some python code which can be used to abuse CVE-2016-5734.

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_6_img_1.png)

![Image 2](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_6_img_2.png)

![Image 3](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_6_img_3.png)

7. The exploit needed credentials to work however, with some google searching I found potential phpMyAdmin default passwords.

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_7_img_1.png)

8. Testing out the credentials on phpMyAdmin revealed root, root as the credentials for the server.

![Image 2](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_7_img_2.png)

9. After downloading the python code and setting up the environment I specified the username and password of the phpMyAdmin server along with the URL to reach it and a command I would like to run, giving me indirect user access on the system.

## Remediation Steps

Steps rank in level of usefulness:
1. phpMyAdmin has several other CVEs, leading to an overall weak security posture while deployed, switch to equivalent software like Adminer.
2. Update phpMyAdmin to a version above 4.4.15.6, 4.4.15.7 has a fix for this specific exploit.
3. Limit exposure & surface area with firewalls, ACLs or a host-based firewall like iptables or ufw [port 8080]

## References

https://nvd.nist.gov/vuln/detail/CVE-2016-5734
https://codeless.co/phpmyadmin-default-password/
https://github.com/HKirito/phpmyadmin4.4_cve-2016-5734/blob/master/phpmyadmin.py

## RCE Vulnerability on sufferance.ethicalhacking.academy – CRITICAL
CWE-502, CVSS3.1 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
CVE-2023-46604

## Summary

A remote code execution vulnerability was discovered on sufferance.ethicalhacking.academy, involving the Apache ActiveMQ version 5.17.3 service being run on the machine. This exploit can be used to create a reverse shell into the root user of the system, giving an attacker full control of sufferance.ethicalhacking.academy.

## Steps To Reproduce

1. Ran an initial service version scan and identified port 8161 as the vulnerable service.
2. After porting the website to my computer, I visited it in a web browser. It prompted me for login credentials, and I tried the same sets of default credentials from the phpMyAdmin page I found earlier. admin, admin worked.

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_9_img_1.png)

![Image 2](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_9_img_2.png)

3. After clicking around the site, I eventually found an information page which contained the version number of the service.
4. Now with the version number, I searched online and found a matching CVE for RCE: CVE-2023-46604.
5. I then searched online for an exploit with the query CVE-2023-46604 poc github and stumbled upon a go script which I could use to exploit the system with.

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_10_img_1.png)

![Image 2](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_10_img_2.png)

6. After cloning the repo, I followed the steps in the README.md
7. I ran a python http server to serve the payload xml file.
8. I opened a netcat listener at port 9001
9. I then edited the payload to match my attack boxes IP address
10. Then I ran the command to start the go script with my variables filled out:

![Image 1](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_11_img_1.png)

11. After running the script my netcat listener caught an open connection and started a dumb shell:

![Image 2](/writeups/network-hacking-i-week-2-lab-sec-450-liam-dale/page_11_img_2.png)

## Remediation Steps

Actions rank in level of usefulness:
1. Update Apache ActiveMQ to a version above 5.17.6 where the CVE is patched.
2. If updating isn't possible remove the exploitable class from the .jar file to temporarily fix.
3. Limit exposure & surface area with firewalls, ACLs or a host-based firewall like iptables or ufw [port 61616, 8161]

## References

https://github.com/rootsecdev/CVE-2023-46604
https://nvd.nist.gov/vuln/detail/cve-2023-46604