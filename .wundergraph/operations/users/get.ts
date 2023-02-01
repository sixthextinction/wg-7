import { createOperation, z } from "../../generated/wundergraph.factory";

const AlbumSchema = z.object({
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
});

type Album = z.infer<typeof AlbumSchema>;
interface AlbumWithLargeCoverArt extends Album {
  artworkUrlLarge: string;
}

const ResponseSchema = z.object({
  resultCount: z.number(),
  results: z.array(
    z.custom<Album>()
  ),
});
type Response = z.infer<typeof ResponseSchema>;



export default createOperation.query({
  input: z.object({
    query: z.string(),
  }),
  handler: async (ctx) => {
    const data = await fetch(
      `https://itunes.apple.com/search?term=${ctx.input.query}&media=music&entity=album&limit=1`
    );
    const response = (await data.json()) as Response;

    const zodResult = ResponseSchema.safeParse(response);

    let returnValue;

    if (zodResult.success) {
      const albums = response.results;
    
      // query and add large coverArt for each album
      albums.forEach((album: AlbumWithLargeCoverArt) => {
        ctx.internalClient.queries.CoverArtByQuery({
          input: {
            luceneQueryString: `${album.collectionName} AND artistname:${album.artistName}`
          }
        })
        .then((coverArtResponse) => {
          // fallback to original 100x100 img if null
          const coverArtUrl = coverArtResponse.data.graphbrainz_search.releases.edges[0].node.coverArtArchive.front || album.artworkUrl100;
          //  assign it
          album.artworkUrlLarge = coverArtUrl;
        }).then(function(){
          returnValue = {
            artist: ctx.input.query,
            success: true,
            albums: albums,
          };
        })
      });
      
      // returnValue = {
      //   artist: ctx.input.query,
      //   success: true,
      //   albums: albums,
      // };
      return returnValue;
      console.log("API response successfully passed validation!");
    } else {
      returnValue = {
        success: false,
        artist: ctx.input.query,
      };
      console.error("API response failed validation!");
      console.error(zodResult);
      console.log("---------------------------");
    }

    // TESTING!
    // const coverArtResponse = await ctx.internalClient.queries.CoverArtByQuery({
    //   input: {
    //     luceneQueryString: `${ctx.input.query} AND artistname:Kylie Minogue`
    //   }
    // })
    // const coverArtUrl = coverArtResponse.data.graphbrainz_search.releases.edges[0].node.coverArtArchive.front || "";

    return returnValue;
  },
});
