---
title: "pisces-scripts"
pubDate: 2026-01-15
description: "A SOC analyst toolkit for querying and triaging network traffic data from the PISCES critical infrastructure sensor network, featuring threat intelligence enrichment and cross-protocol log analysis."
tech: ["Python", "OpenSearch", "ElasticSearch", "Kibana", "HTML", "CSS", "REST APIs"]
link: "https://github.com/liamadale/pisces-scripts"
github: "https://github.com/liamadale/pisces-scripts"
image: "https://opengraph.githubassets.com/1/liamadale/pisces-scripts"
alt: "pisces-scripts GitHub repository"
featured: true
status: "in-progress"
---

# pisces-scripts

A custom SOC analyst toolkit built during my work with PISCES International, providing consolidated visibility into network traffic events collected from real critical infrastructure organizations.

## Purpose

PISCES analysts needed a faster way to investigate suspicious IPs, correlate activity across multiple protocol logs, and manage false positives — all without switching between disparate tools. This toolkit consolidates those workflows into a single terminal-driven and browser-based interface.

## Applications

The toolkit ships four browser-based applications:

- **OpenSearch** — cross-protocol IP activity viewer with per-protocol log breakdowns, enabling analysts to see exactly where a given IP appeared across the sensor network
- **Threat Model** — threat assessment dashboard with IP disposition scoring, aggregating intelligence from multiple external feeds into a single verdict
- **Dashboard** — aggregated analytics visualization for at-a-glance SOC situational awareness
- **Mantis Explorer** — ticket history browser for accessing prior PISCES case records directly within the app

## Technical Details

- Queries the ElasticSearch and OpenSearch APIs to pull real-time and historical event data
- Integrates threat intelligence enrichment via **GreyNoise**, **AbuseIPDB**, **Shodan**, and **VirusTotal**
- Supports granular terminal-based filtering across multiple protocol logs simultaneously
- Includes a false positive suppression system with filterable management to reduce analyst noise
