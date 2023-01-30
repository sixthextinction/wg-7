import { createOperation, z } from "../../generated/wundergraph.factory";

export default createOperation.query({
  input: z.object({
    artist: z.string(),
  }),
  handler: async ({ input }) => {
    const data = await fetch(
      `https://itunes.apple.com/search?term=${input.artist}&media=music&entity=album`
    );
    const albums = await data.json();
    return {
      artist: input.artist,
      albums: albums,
    };
  },
});
