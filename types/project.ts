export interface IArtstationProject {
  id: number,
  user_id: number,
  title: string,
  description: string,
  created_at: string,
  updated_at: string,
  likes_count: number,
  slug: string,
  published_at: string,
  adult_content: boolean,
  cover_asset_id: number,
  admin_adult_content: boolean,
  hash_id: string,
  permalink: string,
  hide_as_adult: boolean,
  cover: {
    id: number,
    small_square_url: string,
    micro_square_image_url: string,
    thumb_url: string
  },
  icons: {
    image: boolean,
    video: boolean,
    video_clip: boolean,
    model3d: boolean,
    marmoset: boolean,
    pano: boolean
  },
}

export interface IArtstationProjectResponse {
  data: IArtstationProject[];
  total_count: number;
}

export interface IMonth {
  month: number;
  year: number;
  projects: IProject[];
}

export interface IProject {
  id: string;
  title: string,
  description: string,
  tags: string[],
  url: string,
  image: string,
}
