import { NextSeo } from "next-seo";
import firstPagePhoto from "@/images/1stpage-photo.jpg";
import firstPagePhoto2 from "@/images/1stpage-photo2.jpg";

export const Seo = ({
  url,
  title,
  description,
  images,
}: {
  url: string;
  title: string;
  description: string;
  images?: any[];
}) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        type: "website",
        locale: "en_GB",
        siteName: "Kayon Decor",
        title,
        description,
        url,
        images: images?.length
          ? images.slice(0, 2).map((image: any) => ({
              url: image.src,
            }))
          : [
              {
                url: firstPagePhoto2.src,
              },
              {
                url: firstPagePhoto.src,
              },
            ],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
};
