// components/JsonLd.js
// Renders a schema.org structured-data block for Google.
// It's a server component: the JSON is written straight into the HTML and no
// JavaScript ships to the browser for it, which keeps the client bundle unchanged.

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" stops any text in the data (an item name, say) from ever
      // closing the <script> tag early and breaking the page.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
