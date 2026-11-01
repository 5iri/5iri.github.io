---
title: Projects
layout: content
permalink: /projects
description: Small computers, chips, and the software around them. A few things I've been building.
content_class: projects-content
page_class: projects-page
---

<div class="project-list">
  {% for project in site.data.projects %}
  {% assign lead_project = forloop.first %}
  <section class="project-entry" aria-labelledby="project-{{ project.id }}">
    <div class="project-copy">
      <h2 id="project-{{ project.id }}">{{ project.title | escape }}</h2>
      <p>{{ project.description | escape }}</p>
      <div class="project-links">
        {% if project.writeup %}<a href="{{ project.writeup | relative_url }}">The writeup <span aria-hidden="true">&rarr;</span></a>{% endif %}
        <a href="{{ project.repo }}" target="_blank" rel="noopener">Repository <span aria-hidden="true">&nearr;</span></a>
        {% if project.details %}<a href="{{ project.details }}" target="_blank" rel="noopener">{{ project.details_label | escape }} <span aria-hidden="true">&rarr;</span></a>{% endif %}
      </div>
    </div>
    {% if project.gallery %}
    <div class="project-gallery">
      {% for media in project.gallery %}
      <figure class="project-media">
        <a class="project-image-link" href="{{ media.image | relative_url }}" aria-label="View full image: {{ media.caption | escape }}">
          <img src="{{ media.image | relative_url }}" alt="{{ media.alt | escape }}" width="{{ media.width }}" height="{{ media.height }}" decoding="async" {% if lead_project and forloop.first %}fetchpriority="high"{% else %}loading="lazy"{% endif %}>
        </a>
        <figcaption>{{ media.caption | escape }}</figcaption>
      </figure>
      {% endfor %}
    </div>
    {% elsif project.image %}
    <figure class="project-media{% if project.image_format %} project-media--{{ project.image_format | escape }}{% endif %}">
      <a class="project-image-link" href="{{ project.image | relative_url }}" aria-label="View full image for {{ project.title | escape }}">
        <img src="{{ project.image | relative_url }}" alt="{{ project.image_alt | escape }}" width="{{ project.image_width }}" height="{{ project.image_height }}" decoding="async" {% if lead_project %}fetchpriority="high"{% else %}loading="lazy"{% endif %}>
      </a>
      {% if project.image_caption %}<figcaption>{{ project.image_caption | escape }}</figcaption>{% endif %}
    </figure>
    {% elsif project.schematic %}
    <figure class="project-media project-media--schematic">
      <div class="project-sketch">
        {% case project.schematic %}
        {% when 'pipeline' %}{% include schematics/pipeline.svg %}
        {% when 'conway' %}{% include schematics/conway.svg %}
        {% endcase %}
      </div>
      {% if project.schematic_caption %}<figcaption>{{ project.schematic_caption | escape }}</figcaption>{% endif %}
    </figure>
    {% endif %}
  </section>
  {% endfor %}
</div>
