---
layout: default
title: Shri
permalink: /
---

<div id="output">
  <div class="prompt-line"><a href="/" style="text-decoration:none;color:inherit;"><span class="segment user">5iri</span><span class="segment path">~</span><span class="dollar">$</span></a> cat about -head 10</div>
  <p>

<h1> Hi! </h1> <br>
Available commands: ls, help, clear, open {filename}, exit
</p>

<div id="prompt" class="prompt-line"><a href="/" style="text-decoration:none;color:inherit;"><span class="segment user">5iri</span><span class="segment path">~</span><span class="dollar">$</span></a> <input id="terminal-input" type="text" autocomplete="on"></div>

<script>
window.terminalFiles = [
{% assign pages = site.pages | where_exp:'p','p.nav_order' | sort:'nav_order' %}
{% for p in pages %}{ name: "{{ p.name }}" }{% unless forloop.last %},{% endunless %}{% endfor %}
];
</script>