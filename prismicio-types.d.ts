// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Content for Filter Button documents
 */
interface FilterButtonDocumentData {
  /**
   * Label field in *Filter Button*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: filter_button.label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;

  /**
   * Description field in *Filter Button*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: filter_button.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  description: prismic.KeyTextField;
}

/**
 * Filter Button document from Prismic
 *
 * - **API ID**: `filter_button`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FilterButtonDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<FilterButtonDocumentData>,
    "filter_button",
    Lang
  >;

type HomepageDocumentDataSlicesSlice = ResultsSlice | HeroSlice;

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
  /**
   * Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Slice Zone field in *Homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice> /**
   * Meta Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Homepage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomepageDocumentData>,
    "homepage",
    Lang
  >;

/**
 * Item in *Result → Locations*
 */
export interface ResultDocumentDataLocationsItem {
  /**
   * Location field in *Result → Locations*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: result.locations[].location
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  location: prismic.SelectField<"Nord-Midtjylland" | "Syddanmark" | "Sjælland">;
}

/**
 * Item in *Result → Music Styles*
 */
export interface ResultDocumentDataMusicStylesItem {
  /**
   * Music Style field in *Result → Music Styles*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: result.music_styles[].music_style
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  music_style: prismic.SelectField<"Pop" | "Classics" | "Elektronisk" | "Jazz">;
}

/**
 * Content for Result documents
 */
interface ResultDocumentData {
  /**
   * Image field in *Result*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: result.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Title field in *Result*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: result.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.TitleField;

  /**
   * Price field in *Result*
   *
   * - **Field Type**: Number
   * - **Placeholder**: *None*
   * - **API ID Path**: result.price
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#number
   */
  price: prismic.NumberField;

  /**
   * Button Link field in *Result*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: result.button_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  button_link: prismic.LinkField;

  /**
   * Locations field in *Result*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: result.locations[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  locations: prismic.GroupField<Simplify<ResultDocumentDataLocationsItem>>;

  /**
   * Music Styles field in *Result*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: result.music_styles[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  music_styles: prismic.GroupField<Simplify<ResultDocumentDataMusicStylesItem>>;
}

/**
 * Result document from Prismic
 *
 * - **API ID**: `result`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ResultDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<ResultDocumentData>, "result", Lang>;

/**
 * Item in *Settings → Navigation*
 */
export interface SettingsDocumentDataNavigationItem {
  /**
   * Link field in *Settings → Navigation*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Label field in *Settings → Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * Site Title field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.site_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  site_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * OG Image field in *Settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.og_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  og_image: prismic.ImageField<never>;

  /**
   * Navigation field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigation: prismic.GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    "settings",
    Lang
  >;

export type AllDocumentTypes =
  | FilterButtonDocument
  | HomepageDocument
  | ResultDocument
  | SettingsDocument;

/**
 * Primary content in *Hero → Primary*
 */
export interface HeroSliceDefaultPrimary {
  /**
   * Heading field in *Hero → Primary*
   *
   * - **Field Type**: Title
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.primary.heading
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  heading: prismic.TitleField;

  /**
   * Body field in *Hero → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;

  /**
   * Button Text field in *Hero → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.primary.button_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  button_text: prismic.KeyTextField;

  /**
   * Button Link field in *Hero → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.primary.button_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  button_link: prismic.LinkField;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault;

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *Results → Items*
 */
export interface ResultsSliceDefaultItem {
  /**
   * Result field in *Results → Items*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: results.items[].result
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  result: prismic.ContentRelationshipField<"result">;
}

/**
 * Default variation for Results Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ResultsSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  Simplify<ResultsSliceDefaultItem>
>;

/**
 * Slice variation for *Results*
 */
type ResultsSliceVariation = ResultsSliceDefault;

/**
 * Results Shared Slice
 *
 * - **API ID**: `results`
 * - **Description**: Results
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ResultsSlice = prismic.SharedSlice<
  "results",
  ResultsSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      FilterButtonDocument,
      FilterButtonDocumentData,
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      ResultDocument,
      ResultDocumentData,
      ResultDocumentDataLocationsItem,
      ResultDocumentDataMusicStylesItem,
      SettingsDocument,
      SettingsDocumentData,
      SettingsDocumentDataNavigationItem,
      AllDocumentTypes,
      HeroSlice,
      HeroSliceDefaultPrimary,
      HeroSliceVariation,
      HeroSliceDefault,
      ResultsSlice,
      ResultsSliceDefaultItem,
      ResultsSliceVariation,
      ResultsSliceDefault,
    };
  }
}
