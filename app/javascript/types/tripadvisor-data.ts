export interface TripadvisorLocalizedValue {
  language: string
  value: string
  primary?: boolean
}

export interface TripadvisorAddress {
  street_address: string
  city: string
  country_name: string
  country_code: string
  language: string
  formatted: string
}

export interface TripadvisorCoordinates {
  latitude: number
  longitude: number
}

export interface TripadvisorPhoneNumber {
  value: string
  type: string
}

export interface TripadvisorUrls {
  tripadvisor: {
    main: string
    photos: string
    write_review: string
    questions_answers: string
  }
  official: string
}

export interface TripadvisorOpeningPeriod {
  day_of_week: string
  opens: string
  closes: string
}

export interface TripadvisorOpeningHours {
  periods: TripadvisorOpeningPeriod[]
  timezone: string
  formatted: string[]
}

export interface TripadvisorOverallRating {
  rating: number
  count: number
  icon_url: string
}

export interface TripadvisorRatingBreakdown {
  count: number
  rating: number
  rating_name: string
}

export interface TripadvisorLanguageCount {
  count: number
  language: string
}

export interface TripadvisorTravelerRatings {
  overall: TripadvisorOverallRating
  breakdowns: TripadvisorRatingBreakdown[]
  language_counts: TripadvisorLanguageCount[]
  subratings: unknown[]
}

export interface TripadvisorLocation {
  id: number
  geo_id: number
  geo: string
  names: TripadvisorLocalizedValue[]
  status: {
    value: string
  }
  descriptions: TripadvisorLocalizedValue[]
  photos: {
    total_count: number
  }
  addresses: TripadvisorAddress[]
  coordinates: TripadvisorCoordinates
  phone_numbers: TripadvisorPhoneNumber[]
  urls: TripadvisorUrls
  opening_hours: TripadvisorOpeningHours
  traveler_ratings: TripadvisorTravelerRatings
  official_email: string
  recommended_visit_length: number
}

export interface TripadvisorPhotoAsset {
  key: string
  original_size_url: string
  original_height: number
  original_width: number
  media_type: string
}

export interface TripadvisorPhotoSource {
  name: string
}

export interface TripadvisorAvatar {
  key: string
  url: string
}

export interface TripadvisorPhotoUser {
  username: string
  geo_id: number
  geo: string
  avatar_url: TripadvisorAvatar
}

export interface TripadvisorPhoto {
  id: number
  location_id: number
  photo: TripadvisorPhotoAsset
  publish_ts: string
  source: TripadvisorPhotoSource
  caption: string
  user: TripadvisorPhotoUser
}

export interface TripadvisorReviewPhoto {
  key: string
  original_size_url: string
  original_height: number
  original_width: number
}

export interface TripadvisorReview {
  id: number
  publish_ts: string
  rating: number
  trip_type: string
  travel_date: string
  url: string
  rating_icon_url: TripadvisorAvatar
  user: TripadvisorPhotoUser
  photos: TripadvisorReviewPhoto[]
  title: TripadvisorLocalizedValue[]
  text: TripadvisorLocalizedValue[]
  subratings: unknown[]
}

export interface TripadvisorData {
  location_details: TripadvisorLocation
  location_photos: TripadvisorPhoto[]
  location_reviews: TripadvisorReview[]
}
