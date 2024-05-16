export function formatResults(results) {
  return results.map((result) => {
    return {
      ...result.data,
      locations: result.data.locations.map((location) => location.location),
      music_styles: result.data.music_styles.map(
        (music_style) => music_style.music_style
      ),
      occasion: result.data.occasion.map((occasion) => occasion.occasion),
    };
  });
}
