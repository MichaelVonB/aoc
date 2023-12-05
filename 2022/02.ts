const htmlString = "<a href='www.foo.de'>link</a>";

const modifiedHtml = htmlString.replace(
  /<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi,
  '<a href="$1" target="_blank">$2</a>'
);

console.log(modifiedHtml);
