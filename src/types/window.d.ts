import Blobity from "blobity";

declare global {
  interface Window {
    blobity?: Blobity;
  }
}
