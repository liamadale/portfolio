---
title: "Web Hacking I - SEC 450"
pubDate: "2025-10-21"
description: "Web application security testing covering SQL injection, XSS, file upload attacks, and brute force vulnerabilities"
category: lab
image: "/writeups/web-hacking-i-lab-sec-450/page_12_img_1.png"
tags: 
    - cybersecurity
    - lab
    - sec450
---

## Introduction

Welcome to my web application security lab writeup! This comes from my ethical hacking course at Bellevue College, where I explored various web vulnerabilities using DVWA (Damn Vulnerable Web Application). I've documented each attack vector I discovered along with practical remediation advice. This lab was a great introduction to web security fundamentals.

## Database credentials left discoverable on web1.ethicalhacking.academy/container/x/ – CRITICAL
OWASP A05:2021
CWE-200, CVSS3.0 7.5:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N

## Summary

There was a major issue discovered on the web1 website hosted by ethicalhacking.academy, database credentials stored in plaintext are discoverable by unauthorized requesters at: web1lab.ethicalhacking.academy/container/[CONTAINER_ID]/config/config.inc.php.bak

## Steps To Reproduce

1. First, initialize the web container.
2. With SecLists installed use the: DirBuster-2007_directory-list-2.3-medium.txt wordlist.
3. Initialize a scan using wfuzz to scan for files that exist on the webserver:
4. Initialize a scan using wfuzz to scan for directories that exist on the webserver:

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_2_img_1.png)

5. Visit web1lab.ethicalhacking.academy/container/[CONTAINER_ID]/setup.php:
6. Use the Create / Reset Database button

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_3_img_1.png)

![Image 2](/writeups/web-hacking-i-lab-sec-450/page_3_img_2.png)

7. With SecLists installed use the: Discovery/Web-Content/quickhits.txt wordlist.
8. Use wfuzz to scan the discovered config directory:
9. Visit web1lab.ethicalhacking.academy/container/[CONTAINER_ID]/config/config.inc.php.bak in a web browser to download the file.
10. Open config.inc.php.bak in a text editor:

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_4_img_1.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Remove the config.inc.php.bak if present on the container.
2. Change database credentials for the container.
3. Configure the apache webserver's .htaccess to deny public access to sensitive extensions like .bak, .inc, etc.
4. Avoid storing database credentials in plaintext files on the system, use Environment Variables or a secrets management service is AWS Secrets or Azure Key Vault.

## References

https://owasp.org/Top10/A05_2021-Security_Misconfiguration/
https://cwe.mitre.org/data/definitions/200.html

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_5_img_1.png)

## Command injection attack possible on web1.ethicalhacking.academy/container/x/vulnerabilities/exec – CRITICAL
OWASP A03:2021
CWE-78, CVSS3.0 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H

## Summary

A command injection vulnerability was discovered on the web1 website hosted on ethicalhacking.academy, this allows an attacker full control of the webserver as the user www-data, allowing for direct interfacing with the webserver host computer. This must be fixed immediately to reduce risk.

## Steps To Reproduce

1. Initialize container
2. Login using valid credentials (ex. admin:password)
3. Using the ip form on the website type: 127.0.0.1|whoami

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_7_img_1.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Avoid calling OS commands directly, instead of using the ping command in bash use a networking library to establish a connection via TCP or ICMP to allow this functionality without using an OS command.
2. Use escapeshellarg() within PHP to help mitigate arguments being supplied to the console via PHP from being interpreted as actual commands.
3. Implement strict input validation, since this is a ping command to make sure that the input matches a valid IP address, this can be done through filter_var($user_ip, FILTER_VALIDATE_IP)

## References

https://owasp.org/Top10/A03_2021-Injection/
https://cwe.mitre.org/data/definitions/78.html

## File inclusion attacks possible on web1.ethicalhacking.academy/container/x/vulnerabilities/fi – HIGH
OWASP A01:2021
CWE-22, CVSS3.0 7.5:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N

## Summary

A file inclusion attack is possible on the web1 webserver at ethicalhacking.academy, this allows attackers to view arbitrary files on the server, potentially sensitive files depending on the permissions of the webserver user.

## Steps To Reproduce

1. Initialize a container
2. Login using default credentials admin:password
3. Type ?page=..\/..\/..\/etc/passwd at the end of the url to display the /etc/passwd file on the machine.

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_9_img_1.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Avoiding direct file paths is the most secure option here, hard-coding in specific paths to results, i.e. ?page=about map to about-us.php
2. Implement a strict allow-list of files which are allowed to be accessed by ?page=, only about-us.php, home.php, etc.
3. Edit php.ini to avoid RFI, use the allow_url_include = off & allow_url_fopen = off to mitigate a remote file inclusion attack (although not showcased here)

## References

https://owasp.org/Top10/A01_2021-Broken_Access_Control/
https://cwe.mitre.org/data/definitions/22.html

## File upload attack possible on web1.ethicalhacking.academy/container/x/vulnerabilities/upload – CRITICAL
OWASP A05:2021
CWE-434, CVSS3.0 9.8:AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H

## Summary

A file upload attack is possible on the web1 webserver running at ethicalhacking.academy, this attack allows bad actors to create an RCE exploit on the machine allowing direct access to the console as the www-data user on the machine, allowing an attacker to take nearly full advantage of the machine.

## Steps To Reproduce

1. Initialize a container
2. Login using default credentials admin:password and write down the generated PHPSESSID cookie.
3. Generate a shell.php script which will turn directly into a webshell when uploaded to the webserver (you might have to turn off your antivirus!)
4. Using a curl command send over the generated file with the set to type=image/jpeg in the file upload field to trick the webserver into accepting the shell.php file.
5. The response from the webserver confirms it's been uploaded successfully.

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_10_img_1.png)

![Image 2](/writeups/web-hacking-i-lab-sec-450/page_10_img_2.png)

6. Visiting URL/hackable/uploads/shell.php?cmd=cat /etc/passwd in a browser reveals our script has been successfully uploaded and we now have a direct connection to the webserver's console.

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_11_img_1.png)

![Image 2](/writeups/web-hacking-i-lab-sec-450/page_11_img_2.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Validate file extension before uploading, use a strict allow list [.png, .jpg, jpeg, .gif, etc.] to avoid tacked on extensions like .phtml or .pphp
2. Store files outside of the website root folder, make a script that grabs the files from a secure directory and streams it to the browser avoiding possible direct execution of an uploaded script if file checks somehow get bypassed.
3. Use built-in PHP functions like finfo_file() & getimagesize()to verify that the uploaded file resembles an image at a binary level.

## References

https://owasp.org/Top10/A05_2021-Security_Misconfiguration/
https://cwe.mitre.org/data/definitions/434.html

## SQL injection attack possible on web1.ethicalhacking.academy/container/x/vulnerabilities/sqli – CRITICAL
OWASP A03:2021
CWE-89, CVSS3.0 8.8:AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H

## Summary

There is an SQL Injection attack possible on the web1 webserver on ethicalhacking.academy, this attack allows for users with credentials to spit out the contents of database tables and remove contents from the database accessible on the web1 webserver.

## Steps To Reproduce

1. Initialize the container
2. Login using default credentials admin:password
3. Write down the PHPSESSID generated
4. Using a curl request to the /sqli/session-input.php file, specify an id=1' UNION SELECT user,password FROM users#
5. Visit URL/vulnerabilities/sqli to view the dumped user & password table.

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_12_img_1.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Use prepared statements instead of concatenating an SQL string, this mitigates injection possibilities as user input is not being rendered as plaintext string which can be escaped.
2. Use a ORM (Object-Relational Mapper) like Doctrine for PHP which abstracts away a lot of the code required for SQL requests in way that makes it hard to exploit injection vulnerabilities.
3. Ensure that the user accessing the database only has the permission required for that specific activity i.e. read from x table instead of being able to INSERT, UPDATE or otherwise modify or read from the database in places they aren't supposed to.

## References

https://github.com/doctrine/orm
https://owasp.org/Top10/A03_2021-Injection/
https://cwe.mitre.org/data/definitions/89.html

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_13_img_1.png)

## Stored XSS attack possible on web1.ethicalhacking.academy/container/x/vulnerabilities/xss_s – HIGH
OWASP A03:2021
CWE-79, CVSS3.0 6.1:AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N

## Summary

There is a stored XSS attack possible on the web1 webserver on ethicalhacking.academy via the guestbook functionality. This attack allows malicious actors to store JavaScript payloads in the database that are executed when any user visits the guestbook page.

## Steps To Reproduce

1. Initialize a container
2. Login using default credentials admin:password
3. Write down the PHPSESSID
4. Using a curl request specify a txtName=<img src=x onerror=alert('your_message_here')>&mtxMessage=Message&btnSign=Sign Guestbook
5. Visit URL/xss_s to have the script execute on your web browser.

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_14_img_1.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Use context aware encoding, tools such as the htmlspecialchars() function in PHP which allow for malicious scripts to be rendered on page harmlessly as text.
2. Use modern templating frameworks like React, Vue.js, etc. which provide the above capabilities by default.
3. Use Content Security Policy which can be configured in apache so that scripts from external sites aren't possible to be executed upon loading a website with a malicious script embedded in the site.

## References

https://www.php.net/manual/en/function.htmlspecialchars.php
https://owasp.org/Top10/A03_2021-Injection/
https://cwe.mitre.org/data/definitions/79.html

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_15_img_1.png)

## Reflected XSS attack possible on web1.ethicalhacking.academy/container/x/vulnerabilities/xss_r – MEDIUM
OWASP A03:2021
CWE-79, CVSS3.0 6.1:AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N

## Summary

There is a reflected XSS vulnerability discovered on the web1 webserver at ethicalhacking.academy. An attacker can use this to craft a specific URL which allows for the running of a custom script on a unsuspecting user's computer, useful in phishing attacks as it makes credential sniffing far easier and less detectable.

## Steps To Reproduce

1. Initialize container
2. Login using default credentials admin:password
3. To view the attack navigate to web1.ethicalhacking.academy/container/x/vulnerabilities/xss_r/?name=%3Cimg%20src%3Dx%20onerror%3Dalert%281%29%3E

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_17_img_1.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Same remediation steps as above apply here, Use context aware encoding, tools such as the htmlspecialchars() function in PHP which allow for malicious scripts to be rendered on page harmlessly as text.
2. Use modern templating frameworks like React, Vue.js, etc. which provide the above capabilities by default.
3. Use Content Security Policy which can be configured in apache so that scripts from external sites aren't possible to be executed upon loading a website with a malicious script embedded in the site.

## References

https://www.php.net/manual/en/function.htmlspecialchars.php
https://owasp.org/Top10/A03_2021-Injection/
https://cwe.mitre.org/data/definitions/79.html

## Brute force attack possible on web1.ethicalhacking.academy/container/x/vulnerabilities/brute – MEDIUM
OWASP A07:2021
CWE-307, CVSS3.0 5.3:AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N

## Summary

A brute forcing attack is possible on the web1 webserver at ethicalhacking.academy. The website has no protection for brute force attacks, which allows attackers to enumerate credentials for accounts, leading to a compromise of credentials for users of the site.

## Steps To Reproduce

1. Initialize container
2. Login using default credentials admin:password
3. Take note of the PHPSESSID
4. Using the table of users, we've dumped earlier I created a new wordlist.txt which contains all DVWA users.
5. To properly filter out results in our brute force attack we need to find out how many characters differ between successful and failed attempts, using curl piped into wc -c, we find that successful attempts have around ~3401 chars while failed attempts have 3345 exactly.
6. Using wfuzz, provide necessary cookies and wordlists, along with our filter --hh 3345 and our FUZZ'd URL (hammering the server with 200 threads is not required)

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_18_img_1.png)

![Image 1](/writeups/web-hacking-i-lab-sec-450/page_19_img_1.png)

![Image 2](/writeups/web-hacking-i-lab-sec-450/page_19_img_2.png)

## Remediation Steps

Steps from here will rank from usefulness:
1. Implement some sort of account lockout, after 10 or so failures to enter the right password lock the account for x minutes. To increase the effectiveness of this, implement a progressive account lockout where every subsequent failure leads to a slightly longer lockout time.
2. Implement rate limiting, i.e. how many requests can be made in a given time. This is web server independent and can either be implemented on the apache webserver or at the server, firewall or API level.
3. Require a CAPTCHA after failed attempts, this forces human interaction to proceed without providing much friction for the actual user if they happen to be targeted by a brute force attack.

## References

https://httpd.apache.org/docs/current/mod/mod_ratelimit.html
https://developers.google.com/recaptcha
https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/
https://cwe.mitre.org/data/definitions/307.html