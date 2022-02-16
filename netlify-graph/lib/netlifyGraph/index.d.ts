// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!

export type NetlifyGraphFunctionOptions = {
  /**
   * The accessToken to use for the request
   */
  accessToken?: string;
  /**
   * The siteId to use for the request
   * @default process.env.SITE_ID
   */
  siteId?: string;
}

export type WebhookEvent = {
  body: string;
  headers: Record<string, string | null | undefined>;
};

export type GraphQLError = {
  "path": Array<string | number>,
  "message": string,
  "extensions": Record<string, unknown>
};




export type SpotifyFeatured = {
  /**
  * Any data from the function will be returned here
  */
data: {
  /**
  * The root for Spotify queries
  */
spotify: {
  /**
  * A list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
  */
featuredPlaylists: Array<{
  /**
  * The name of the playlist.
  */
name: string;
  /**
  * Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See Working with Playlists. Note: If returned, the source URL for the image (url) is temporary and will expire in less than a day.
  */
images: Array<{
  /**
  * The source URL of the image.
  */
url: string;
}>;
}>;
};
};
  /**
  * Any errors from the function will be returned here
  */
errors: Array<GraphQLError>;
};

/**
 * Spotify get featured playlist
 */
export function fetchSpotifyFeatured(
  /**
  * Pass `{}` as no variables are defined for this function.
  */
  variables: Record<string, never>,
  options?: NetlifyGraphFunctionOptions
): Promise<SpotifyFeatured>;
