import {
  addDoc, collection, doc, getDoc, updateDoc,
} from 'firebase/firestore';

export const getUserDataById = (db, uid) => {
  const userRef = doc(db, 'users', uid);

  return getDoc(userRef).then((userData) => {
    if (userData.data()) {
      return userData.data();
    }
    return Promise.reject( new Error('user not found'));
  });
};

export const postHousehold = (db, user, householdName) => {
  const userId = user ? user.uid : null;
  const userRef = user ? doc(db, 'users', userId) : null;
  const newHouseholdRef = addDoc(collection(db, 'households'), { household_name: householdName });

  return newHouseholdRef.then((household) => {
    if (user) {
      return updateDoc(userRef, { household_id: household.id });
    } return Promise.reject( new Error('no logged in user'));
  });
};

// just here to show how to use function in profile

// const [userData, setUserData] = useState({})
// const [isLoading, setIsLoading] = useState(true)

// useEffect(() => {
//   getUserDataById(db, "2aTBhAwOinU5YxpWAa0nlb48tIz2").then((result) => {
//     setUserData(result)
//     setIsLoading(false)
//   })
// }, []);
