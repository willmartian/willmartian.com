---
title: "CSS-only spoiler text"
date: 2025-12-13
blurb: "Accessible spoiler text without JavaScript"
# comments: "https://fosstodon.org/@willmartian/109285848751638736"
usePrism: true
eleventyExcludeFromCollections: true
---

Can we build a spoiler text that
- requires 0 Javascript,
- is accessible,
- and can be used inline?

<p>
    <details class="spoiler">
        <summary title="Spoiler"></summary>
        No. But you can pick 2 out of 3.
    </details>
</p>

<hr />

## Approach 1: the `details` element

This uses the `details` HTML element, with some CSS trickery. Without styling, it looks like this:

<p>
<details>
    <summary>Click me</summary>
    
```html
<details>
    <summary>Click me</summary>
    Hello world!
</details>
```

</details>
</p>



The default behavior for `details` is to show and hide its content. We want to change this to make the content always visible, just with different styles applied (in this case, a thick line-through, but one could also apply a blur or anything else). This is acchieved through changing the `content-visiblity` of  `::details-content`.

```css
details.spoiler::details-content {
  content-visibility: visible;
}
```

### Con: cannot be used inline

Unfortunately, this approach cannot be used inline within paragraphs, `p`. Standard HTML parsers will automatically close and reopen `p` tags around certain elements, including `details`. 

<p>Foo <details class="spoiler"><summary title="Spoiler!!!"></summary>Bar</details> Baz</p>


A (poor) work-around is to use a `div` instead of `p`, but this decreases accessibility and is annoying: 

<div>Foo <details class="spoiler"><summary title="Spoiler!!!"></summary>Bar</details> Baz</div>


```html
<div>Foo <details class="spoiler"><summary title="Spoiler!!!"></summary>Bar</details> Baz</div>

<style>
details.spoiler {
    display: inline;

    &::details-content {
        display: inline;
    }
}
</style>
```

## Approach 2: checkbox hack


## Approach 3: vanilla web component

<p>
    Foo
    <x-spoiler>
        Bar
    </x-spoiler>
    Baz
</p>

<script>
        class SlottedComponent extends HTMLElement {
            constructor() {
                super(); // Always call super() first in the constructor

                // Create a shadow root and attach a template with a slot
                const shadow = this.attachShadow({ mode: 'open' });

                // Define the component's internal structure using a template literal
                const template = document.createElement('template');
                template.innerHTML = `
                <style>
                        details.spoiler {
                            position: relative;
                            display: inline;

                            &::details-content {
                            content-visibility: visible;
                            display: inline;
                            }

                            &:not([open]), &:not([open]) * {
                                text-decoration: line-through;
                                text-decoration-thickness: 100%;
                                user-select: none;
                            }

                            summary::marker {
                            content: "";
                            }

                            summary {
                            cursor: pointer;
                            
                            z-index: 1;
                            
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            left: 0;
                            }

                            &[open] summary {
                                /* Remove this to allow for re-hiding spoilers */
                                display: none;
                            }
                        }
                    </style>


                    <details class="spoiler">
                        <summary title="Spoiler"></summary>
                        <slot></slot>
                    </details>
                `;

                
                shadow.appendChild(template.content.cloneNode(true));
            }
        }

        
        customElements.define('x-spoiler', SlottedComponent);
</script>


## Full implementation

```html
<details class="spoiler">
    <summary aria-label="Spoiler"></summary>
    Hello world!
</details>


<style>
    details.spoiler {
        position: relative;

        &::details-content {
            content-visibility: visible;
        }

        &:not([open]), &:not([open]) * {
            text-decoration: line-through;
            text-decoration-thickness: 100%;
            user-select: none;
        }

        summary::marker {
          content: "";
        }

        /* Clicking the (empty) summary element reveals the details. */
        summary {
          cursor: pointer;
          
          z-index: 1;
          
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
        }

        /* Remove this to enable re-hiding spoilers */
        &[open] summary {
          display: none;
        }
      }
</style>
```

<style>
    pre {
        max-width: fit-content;
        
        code {
            font-size: .85rem !important;
        }
    }

    details.spoiler {
        position: relative;
        display: inline;

        &::details-content {
          content-visibility: visible;
          display: inline;
        }

        &:not([open]), &:not([open]) * {
            text-decoration: line-through;
            text-decoration-thickness: 100%;
            user-select: none;
        }

        summary::marker {
          content: "";
        }

        summary {
          cursor: pointer;
          
          z-index: 1;
          
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
        }

        &[open] summary {
          /* Remove this to allow for re-hiding spoilers */
          display: none;
        }
      }
</style>
