import { createOperation, z } from "../../generated/wundergraph.factory";

const ResultSchema = z.object({
  resultCount: z.number(),
  results: z.array(
    z.object({
      // wrapperType: z.string().optional(),
      // collectionType: z.string().optional(),
      // artistId: z.number().optional(),
      collectionId: z.number(),
      // amgArtistId: z.number().optional(),
      artistName: z.string(),
      collectionName: z.string(),
      // collectionCensoredName: z.string().optional(),
      // artistViewUrl: z.string().optional(),
      collectionViewUrl: z.string(),
      // artworkUrl60: z.string().optional(),
      artworkUrl100: z.string(),
      // collectionPrice: z.number().optional(),
      // collectionExplicitness: z.string().optional(),
      // trackCount: z.number().optional(),
      // copyright: z.string().optional(),
      // country: z.string().optional(),
      // currency: z.string().optional(),
      // releaseDate: z.string().optional(),
      // primaryGenreName: z.string().optional(),
    })
  ),
});

type Result = z.infer<typeof ResultSchema>;

export default createOperation.query({
  input: z.object({
    query: z.string(),
  }),
  handler: async ({ input }) => {
    const data = await fetch(
      `https://itunes.apple.com/search?term=${input.query}&media=music&entity=album`
    );
    const albums = await data.json() as Result;

    let returnValue;

    const zodResult = ResultSchema.safeParse(albums);

    if (zodResult.success) {
      returnValue = {
        success: true,
        artist: input.query,
        albums: albums,
      };
      console.log("API response successfully passed validation!");
    } else {
      returnValue = {
        success: false,
        artist: input.query,
      };
      console.error("API response failed validation!");
      console.error(zodResult);
      console.log("---------------------------");
    }

    return returnValue;
  },
});
