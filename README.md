---
layout: default
title: Shri
permalink: /
nav_order: 1
---

<section class="hero reveal" data-parallax="0.02" style="margin: 1.5rem 0;">
  <div class="hero-grid">
    <div>
      <span class="hero-tag mono">lab log · January 2026</span>
      <h1>always curious.</h1>
      <p class="hero-lede">I am
        <span class="hover-peek">
          <span class="hover-peek__trigger">Shri</span>
          <span class="hover-peek__card">
            <img src="{{ '/markdown_files/posts/assets/me.jpeg' | relative_url }}">
          </span>
        </span>.
        I love working on silicon, hardware, and seeing my vision come up everything from scratch. I’m 20, I love
        <span class="hover-peek">
          <span class="hover-peek__trigger">drinking redbull and eating chips</span>
          <span class="hover-peek__card">
            <img src="{{ '/markdown_files/posts/assets/catcoke.png' | relative_url }}">
          </span>
        </span>.
      </p>
      <div class="actions">
        <a class="btn btn--solid" href="/blog">My blogs</a>
        <a class="btn btn--ghost" href="/projects">My projects</a>
      </div>
    </div>

    <div>
      <dl class="hero-meta">
        <div>
          <dt>Now</dt>
          <dd>Working on a bunch of work, mostly towards energy efficient compuation.</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Current Work: CXL Emulators</dd>
        </div>
        <div>
          <dt>Next session</dt>
          <dd>Saturday cowork, 20:00 IST (remote) (thinking of going live on kick)</dd>
        </div>
      </dl>
      <ul class="hero-list">
        <li><span> working on writing a complete view of computer architecture.</span><span><a href="github.com/5iri/comp-arch-study-group">github repo </a></span></li>
        <li><span>Simultaneously working on a bunch of projects. </span><span><a href="/blog">Check my blogs!</a></span></li>
        <li><span>Currently busy with exams.</span><span></span></li>
      </ul>
      <p class="hero-note">Check out my <a href="/twitter"> twitter</a> for my sanity.</p>
    </div>
  </div>
</section>

<section class="section reveal">
  <h2 class="section-title">Current quests</h2>
  <p class="section-desc">Which tracks am I actively publishing about?</p>
  <ul class="list-ruled">
    <li>Neuromorphic Hardware</li>
    <li>CXLMemSim</li>
    <li>open source CPU which is actually industry usable</li>
  </ul>
</section>

<section class="section reveal">
  <h2 class="section-title">Latest writing</h2>
  <div class="grid grid-3">
  {% assign by_parent = site.pages | where: "parent", "Blog" %}
  {% assign by_url = site.pages | where_exp: "p", "p.url contains '/blog'" %}
  {% assign blog_pages_all = by_parent | concat: by_url | uniq %}
  {% assign blog_pages = blog_pages_all | where_exp: "p", "p.url != '/blog'" %}

  {% assign dated = blog_pages | where_exp: "p", "p.date" | sort: "date" | reverse %}
  {% assign undated = blog_pages | where_exp: "p", "p.date == nil" | sort: "title" %}
  {% assign combined = dated | concat: undated %}
  {% for p in combined limit:3 %}
    <a class="card" href="{{ p.url | relative_url }}">
      <div class="card-kicker">blog</div>
      <div class="card-title">{{ p.title | default: p.url }}</div>
      {% capture ex %}{{ p.content | markdownify | strip_html | strip_newlines | truncate: 140 }}{% endcapture %}
      <div class="card-excerpt">{{ ex }}</div>
    </a>
  {% endfor %}
  </div>
</section>

<section class="section reveal">
  <h2 class="section-title">Contact</h2>
  <p class="section-desc">Places where I might be alive or sane enough to respond.</p>
  <div class="contact-links">
    <a class="contact-link" href="/email">email</a>
    <a class="contact-link" href="/github">github</a>
    <a class="contact-link" href="/twitter">x / @lazybananann</a>
    <a class="contact-link" href="/linkedin">linkedin</a>
  </div>
</section>

<section class="section reveal">
  <h2 class="section-title">Hobbies</h2>
  <p class="section-desc">What keeps me sane?</p>
  <ul class="list-ruled">
    <li>I love mathematics! I try to sit down and work on some problems whenever I can! current progres <a href="/notes/math/abstract_algebra">here </a></li>
    <li>I love listening to music!! Here's my <a href="https://open.spotify.com/user/wdzf3o8vx7fff8lxn35cxts43?si=ad4511d4896647aa">spotify </a>:)</li>
    <li>revamp my website for the 1000th time.</li>
  </ul>
</section>
