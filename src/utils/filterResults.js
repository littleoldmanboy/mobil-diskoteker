export function filterResults(items, filters) {
  if (!filters) return items;
  // Extract filters from the object
  const occasionFilter = filters["1"];
  const locationFilter = filters["2"];
  const priceFilter = filters["3"];
  const musicStyleFilter = filters["4"];

  return items.filter((item) => {
    // Check occasion filter if it's not null
    const occasionMatch =
      !occasionFilter ||
      (item.occasion && item.occasion.includes(occasionFilter));

    // Check location filter if it's not null
    const locationMatch =
      !locationFilter ||
      (item.locations && item.locations.includes(locationFilter));

    // Check price filter if it's not null
    // Filter to show only items that are cheaper than the specified price
    const priceMatch =
      !priceFilter || (item.price && item.price <= priceFilter);

    // Check music style filter if it's not null
    const musicStyleMatch =
      !musicStyleFilter ||
      (item.music_styles && item.music_styles.includes(musicStyleFilter));

    // Return true if all conditions match
    return occasionMatch && locationMatch && priceMatch && musicStyleMatch;
  });
}
