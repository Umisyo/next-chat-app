import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
// import { FIREBASE_STORAGE_URL } from '~/constant/env';

const storage = getStorage()
const storageRef = ref(storage)

export const useUploadImg = async (image: any) => {
  if (image.name) {
    const ext = image.name.split('.').pop()
    const hashName = Math.random().toString(36).slice(-8)
    const fullPath = '/images/' + hashName + '.' + ext
    const uploadRef = ref(storageRef, fullPath)

    return await uploadBytes(uploadRef, image).then(async function (result) {
      return await getDownloadURL(uploadRef).then(function (url) {
        const uploadResult = url
        return uploadResult
      })
    })
  }
}
