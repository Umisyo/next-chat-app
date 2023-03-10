export interface GroupObject {
  groupName: string,
  latestEntry?: {
    sendUser: string,
    message: string
  },
  updatedAt: string
}