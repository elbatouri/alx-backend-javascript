import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  try {
    const resFromUploadPhoto = await uploadPhoto();
    const resFromCreateUser = await createUser();
    return {
      photo: resFromUploadPhoto,
      user: resFromCreateUser,
    };
  } catch {
    return {
      photo: null,
      user: null,
    };
  }
}
