import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";

export const getUserDataById = (uid) => {
  const userRef = doc(db, "users", uid);

  return getDoc(userRef).then((userData) => {
    if (userData.data()) {
      return userData.data();
    }
    return Promise.reject(new Error("user not found"));
  });
};

export const postHousehold = (userId, householdName) => {
  const userRef = doc(db, "users", userId);
  const newHouseholdRef = addDoc(collection(db, "households"), {
    household_name: householdName,
  });

  return newHouseholdRef.then((household) => {
    if (userId) {
      return updateDoc(userRef, { household_id: household.id });
    }
    return Promise.reject(new Error("no logged in user"));
  });
};

export const patchUserWithHouseholdId = (userId, householdId) => {
  const userRef = doc(db, "users", userId);
  const householdRef = doc(db, "households", householdId);

  return getDoc(householdRef).then((householdSnap) => {
    if (userId && householdSnap.exists()) {
      return updateDoc(userRef, { household_id: householdId });
    }
    return Promise.reject(new Error("no logged in user"));
  });
};

export const postAuthUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const getChoresByHouseholdId = (currentUser) => {
  const userId = currentUser ? currentUser.uid : null;

  return getUserDataById(userId)
    .then((userData) => {
      const householdId = userData.household_id;
      const q = query(
        collection(db, "chores"),
        where("household_id", "==", householdId)
      );
      return getDocs(q);
    })
    .then((chores) => {
      const choresArray = [];

      chores.forEach((chore) => {
        choresArray.push({ chore_id: chore.id, ...chore.data() });
      });
      return choresArray;
    });
};

export const patchChoreIsCompleted = (completedChoreId, isCompleted) => {
  const choreRef = doc(db, "chores", completedChoreId);

  return updateDoc(choreRef, {
    is_completed: !isCompleted,
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
