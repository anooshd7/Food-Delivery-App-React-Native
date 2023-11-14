import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {projectID} from '@env'; 

const client = sanityClient({
  projectId: projectID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-07",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
