---
title: Projects
layout: content
permalink: /projects
description: FPGA accelerators, RISC-V cores, and experiments in C and assembly.
content_class: projects-content
---

<div class="project-list">
  {% for project in site.data.projects %}
  <section class="project-entry{% cycle '', ' project-entry--reverse' %}" aria-labelledby="project-{{ project.id }}">
    {% if project.image %}
    <figure class="project-media">
      <a class="project-image-link" href="{{ project.image | relative_url }}" aria-label="View full image for {{ project.title | escape }}">
        <img src="{{ project.image | relative_url }}" alt="{{ project.image_alt | escape }}" width="{{ project.image_width }}" height="{{ project.image_height }}" decoding="async" {% if forloop.first %}fetchpriority="high"{% else %}loading="lazy"{% endif %}>
      </a>
    </figure>
    {% elsif project.schematic %}
    <figure class="project-media project-media--schematic">
      {% case project.schematic %}
      {% when 'pipeline' %}{% include schematics/pipeline.svg %}
      {% when 'conway' %}{% include schematics/conway.svg %}
      {% endcase %}
    </figure>
    {% endif %}
    <div class="project-copy">
      <p class="project-kicker">{{ project.category | escape }}</p>
      <h2 id="project-{{ project.id }}">{{ project.title | escape }}</h2>
      <p>{{ project.description | escape }}</p>
      <div class="project-links">
        <a href="{{ project.repo }}" target="_blank" rel="noopener">Repository <span aria-hidden="true">&nearr;</span></a>
        {% if project.details %}<a href="{{ project.details }}" target="_blank" rel="noopener">{{ project.details_label | escape }} <span aria-hidden="true">&rarr;</span></a>{% endif %}
      </div>
    </div>
  </section>
  {% endfor %}
</div>
