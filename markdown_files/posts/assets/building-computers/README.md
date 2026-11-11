# Media for the rewrite

The article uses `_includes/media-figure.html` for side images and videos, and
`_includes/media-peek.html` for previews on linked words. Figures sit in the margins
at viewport widths of 1350px and above; at smaller widths they stack in the article.
Click an image to view it, or focus a preview link with the keyboard to reveal it.

```liquid
{% include media-figure.html side="left" image="/markdown_files/posts/assets/building-computers/fpga-board.webp" alt="FPGA board on a desk" caption="The board on the desk." %}
{% include media-peek.html text="the demo" image="/markdown_files/posts/assets/tiny-tpu-weekend/mnist-demo-1.png" link="/markdown_files/posts/assets/tiny-tpu-weekend/mnist-demo.mp4" alt="MNIST demo" caption="Click to watch." %}
{% include media-figure.html side="right" video="/markdown_files/posts/assets/tiny-tpu-weekend/mnist-demo.mp4" poster="/markdown_files/posts/assets/tiny-tpu-weekend/mnist-demo-1.png" alt="MNIST demo" caption="The early MNIST demo." %}
```

## New photos

- `santra-laptop.webp`: Santra at the workbench, Photos original `IMG_9004.HEIC`, 26 September 2026. Locally rendered export; no EXIF metadata.
- `santra-desk.webp`: Santra at the workbench, Photos original `IMG_9006.HEIC`, 26 September 2026. Locally rendered export; no EXIF metadata.
- `santra-supervising.webp`: Santra at the workbench, Photos original `IMG_9002.HEIC`, 26 September 2026. Locally rendered export; no EXIF metadata.

- `trainer-board-2025.webp`: iCloud original `IMG_347CD549-1602-4725-A29E-8A9829EC2DB2.JPEG`, 6 November 2025, 12:30 PM. Microcontroller trainer with display reading `2000`. Downloaded and visually verified; available for the rewrite, not assigned to a specific project.

- `fpga-board.webp`: Photos original filename `IMG_9014.HEIC`, 30 September 2026.
- `fpga-workbench.webp`: Photos original filename `IMG_9013.HEIC`, 30 September 2026.

The two September 2026 images use the locally rendered Photos image so the reviewed crop and orientation
are retained. WebP exports contain no EXIF location metadata. Library originals
were not changed.

## Existing assets available for reuse

- `/markdown_files/posts/assets/tiny3tpu-stack/banana.gif`: mesh transform demo.
- `/markdown_files/posts/assets/tiny3tpu-stack/cloth.gif`: cloth demo, sped up.
- `/markdown_files/posts/assets/tiny3tpu-stack/classifier.gif`: classifier demo.
- `/markdown_files/posts/assets/tiny3tpu-stack/system-config.png`: system configuration.
- `/markdown_files/posts/assets/tiny-tpu-weekend/mnist-demo.mp4`: earlier MNIST video.
- `/markdown_files/posts/assets/tiny-tpu-weekend/mnist-demo-1.png`: earlier demo still.
- `/assets/img/projects/spi-matrix-gds.jpg`: Tiny Tapeout die layout, not a die photograph.
- `/assets/img/projects/prosperity-tcam.png`: TCAM component diagram, not a hardware demonstration.
- `/markdown_files/posts/assets/tiny-tpu-is-now-bigger/uart-gemm-console.png`: UART GEMM output.
- `/markdown_files/posts/assets/tiny-tpu-is-now-bigger/udp-summary-20-samples.png`: UDP measurements.

Portrait candidates and the private review gallery are outside this repository in
`~/Pictures/5iri-site-shortlist/`. November 2025 cloud media is available here. The rejected July 2024 photo is excluded from the published assets.

## Older cloud media

- `oscilloscope-2024.webp`: `IMG_2170.HEIC`, 16 August 2024 at 2:54 PM. Lab oscilloscope in XY mode, showing an elliptical trace. Available for the rewrite; no specific project attribution.

- `arty-board-2024.webp`: cropped export of `IMG_2086.HEIC`, 5 August 2024 at 5:25 PM. Arty FPGA board connected over USB, with a button being pressed. Original retained in the private shortlist. No project identity inferred from the board alone.
- `robot-board-leds-2025-11-15.mp4` and `.jpg`: `IMG_6738.MOV`, 15 November 2025. 19-second robot-electronics bench test with changing LED patterns. Linked from the SRA section.
- `robot-board-2025-11-16.mp4` and `.jpg`: `IMG_6744.MOV`, 16 November 2025. 24-second close view of the board marked WALL-E v2.7; available for the rewrite.

Videos are H.264 MP4 with metadata removed and a maximum 1280×720 bounding box. Posters are extracted from the verified clips. Cloud originals remain outside the repository.
The private gallery also holds two October 2026 Chromatic demos, three portrait candidates from Photos’ existing name tag, and exact iCloud item links for older clips whose downloads failed. Those candidates have not been added to the public page.
