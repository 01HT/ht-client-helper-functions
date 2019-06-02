/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
  Utility method that updates the page's open graph and Twitter card metadata.
  It takes an object as a parameter with the following properties:
  title | description | url | image.
  If the `url` is not specified, `window.location.href` will be used; for
  all other properties, if they aren't specified, then that metadata field will not
  be set.
  Example (in your top level element or document, or in the router callback):
      import { updateMetadata } from 'pwa-helpers/metadata.js';
      updateMetadata({
        title: 'My App - view 1',
        description: 'This is my sample app',
        url: window.location.href,
        image: '/assets/view1-hero.png'
      });
*/
export const getMetaDescriptionFromQuillObject = quillObject => {
  let description = "";
  if (quillObject.ops) {
    for (let part of quillObject.ops) {
      if (
        description.length < 120 &&
        part.insert &&
        typeof part.insert === "string" &&
        part.insert !== "\n"
      ) {
        description += ` ${part.insert}`;
      }
    }
  }
  return description;
};

export const updateMetadata = ({
  title,
  description,
  url,
  image,
  imageAlt,
  canonical,
  noindex
}) => {
  // title
  document.title = title;
  _updateMeta("meta", { property: "og:title", content: title });

  // description
  _updateMeta("meta", { name: "description", content: description });
  _updateMeta("meta", { property: "og:description", content: description });

  // og:
  _updateMeta("meta", { property: "og:image", content: image });
  _updateMeta("meta", { property: "og:image:alt", content: imageAlt });
  _updateMeta("meta", {
    property: "og:url",
    content: canonical || url || window.location.href
  });

  // noindex
  _updateMeta("meta", { name: "robots", content: noindex });

  // canonical
  _updateMeta("link", { rel: "canonical", href: canonical });
};

function _updateMeta(tagName, attributes) {
  let firstAttributeName = Object.keys(attributes)[0];
  let firstAttributeValue = attributes[Object.keys(attributes)[0]];
  let secondAttributeValue = attributes[Object.keys(attributes)[1]];
  let metaExist =
    secondAttributeValue !== undefined && secondAttributeValue !== "";
  let element = document.querySelector(
    `${tagName}[${firstAttributeName}="${firstAttributeValue}"]`
  );
  if (!metaExist) {
    if (element) element.parentNode.removeChild(element);
  } else {
    if (!element) {
      element = document.createElement(tagName);
    }
    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
    document.head.appendChild(element);
  }
}
