import { categories, categoryMap, products } from "@/data/store";
import { getProductUrl } from "@/utils";

const EXTERNAL_DATA_URL = "https://kayon-decor.com";

function generateSiteMap(posts: { id: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://kayon-decor.com</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${id}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  const staticPages = [
    {
      id: "/about-us/",
    },
    {
      id: "/contact-us/",
    },
    {
      id: "/faq/",
    },
    {
      id: "/products/",
    },
  ];
  const generatedProductPages = products.map((p) => ({
    id: getProductUrl(p, categoryMap[p.category]),
  }));
  const generatedCategoryPages = categories.map((c) => ({
    id: `/categories/${c.slug}`,
  }));

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap([
    ...generatedProductPages,
    ...generatedCategoryPages,
    ...staticPages,
  ]);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
