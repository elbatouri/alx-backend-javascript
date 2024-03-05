import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';


export default async function handleProfileSignup(firstName, lastName, fileName) {
  return Promise
    .allSettled([signUpUser(firstName, lastName), uploadPhoto(fileName)])
    .then((resultat) => (
      resultat.map((outcome) => ({
        status: outcome.status,
        value: outcome.status === 'fulfilled' ? outcome.value : String(outcome.reason),
      }))
    ));
}
