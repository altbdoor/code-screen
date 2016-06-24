---
layout: base
---

1. **How do I use it?**
   
   Short answer, fill in the necessary fields, click "Generate HTML preview", check the HTML preview, click "Generate image from HTML", click "View generated image", and save the image if you are satisfied.
   
   Long answer, 

1. **The filename or code is not being displayed in the preview.**
   
   Make sure your Custom HTML field has an element with the ID `#output-filename` for the filename, and the ID `#output-code` for the code to be displayed.

1. **What is `@scale` for in the Custom LESS field?**
   
   `@scale` is included by default, and used in the many of the LESS rules. This largely concerns [Apple's Retina Display](https://en.wikipedia.org/wiki/Retina_Display), by blowing up the elements in the image by a factor of `@scale`.
   
   As an example, let's assume `#output-container {font-size:14px; width:400px}` with `@scale: 2`. When you generate the image, the font size would be 28px, and its width 800px. You can then include the image in your webpage with `width="400px"`, and it will still look good on screens with DPI of 2.0 or less.
   
   So when you write your own Custom LESS, if you believe the rule will scale, use `(@scale * {unit}{measurement})` instead.

1. **Things do not look good at certain `@scale` values.**
   
   Your browser will attempt to round off certain values. At smaller `@scale` values, this will become more obvious. Try using `@scale: 2`, or higher.

1. **The generated image is clipped.**
   
   Two possible scenarios. One, it is highly unlikely, but the generated image is limited to your browser viewport. If this happens, tweak the values of the width and height fields until it fits.
   
   Two, the CSS width or height values for `#output-container` contradicts the values in width or height fields. If the CSS width is 800px, and the generated image width is 600px, 200px is lost in the abyss.

1. **What is "Include fake anti-alias"?**
   
   A simple Google with "text shadow anti alias" will give you many results relevant to this. Basically, its <strike>ab</strike>using the text-shadow CSS rule to give an impression of anti-alias. You should not need it if your browser is rendering the fonts properly.

1. **Why do I have to click "View generated image" after "Generate image from HTML"?**
   
   By design, most modern browsers do not allow a new tab to be opened via JavaScript. There are ways around it, but the most solid solution is to have you click on a link. While I can add the image to the page itself, the page is already pretty crowded. Plus, the HTML preview is more or less the same.

1. **Where are the code line numbers?**
   
   highlight.js has a [valid argument](http://highlightjs.readthedocs.io/en/latest/line-numbers.html) about this. In short, it is not implemented (yet).

1. **Why are the styles for this page so simple?**
   
   The script used to convert DOM to an image here is tsayen/dom-to-image. In order to generate the image, it re-fetches all the CSS files included in the HTML. There seems to be an [issue](https://github.com/tsayen/dom-to-image/issues/13) with Firefox and external CSS files, which result in it throwing errors. So I decided to strip the CSS to the bare minimum with only Normalize.css.

<!-- 1. **question**
   
   answer -->

---

[Return to home](./index.html)
