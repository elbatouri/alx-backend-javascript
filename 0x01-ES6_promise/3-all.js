import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  return Promise
    .all([uploadPhoto(), createUser()])
    .then((resultat) => {
      console.log(`${resultat[0].body} ${resultat[1].firstName} ${resultat[1].lastName}`);
    })
    .catch(() => console.log('Signup system offline'));
}
