export interface ICurrentUser {
  id?: number | undefined;
  email?: string | undefined;
  username?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  dob?: Date | undefined;
  profile_img?: string | undefined;
  introduction?: string | undefined;
  is_login?: boolean | undefined;
}

export interface IModelGroup {
  id: number;
  group_name: string;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  model_planes?: [IModelPlane] | undefined;
  model_boxes?: [IModelBox] | undefined;
  model_spheres?: [IModelSphere] | undefined;
}

export interface IModelPlane {
  id: number;
  width?: number | undefined;
  depth?: number | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  color?: string | undefined;
  image_url?: string | undefined;
  mass?: number | undefined;
  group: {
    id: number;
    group_name: string;
  };
}

export interface IModelBox {
  id: number;
  width?: number | undefined;
  height?: number | undefined;
  depth?: number | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  color?: string | undefined;
  image_url?: string | undefined;
  mass?: number | undefined;
  group: {
    id: number;
    group_name: string;
  };
}

export interface IModelSphere {
  id: number;
  radius?: number | undefined;
  width_segments?: number | undefined;
  height_segments?: number | undefined;
  xposition?: number | undefined;
  yposition?: number | undefined;
  zposition?: number | undefined;
  xrotation?: number | undefined;
  yrotation?: number | undefined;
  zrotation?: number | undefined;
  color?: string | undefined;
  image_url?: string | undefined;
  mass?: number | undefined;
  group: {
    id: number;
    group_name: string;
  };
}
