export interface Activity {
  readonly id: number | undefined,
  type: string
  text: string | undefined
  pinned?: boolean
}

export interface ActivitiesState {
  activity: Activity;
  activities: Activity[];
  activityModalOpen: boolean;
  isEditing: boolean;
  minimize: boolean;
}