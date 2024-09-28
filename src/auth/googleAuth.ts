import { 
  Auth,
  UserCredential,
  User,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword as firebaseCreateUser,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebaseConfig';

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    console.log('Google Sign-In successful:', result.user);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

export const createUserWithEmailAndPassword = async (
  email: string, 
  password: string
): Promise<User> => {
  try {
    const result: UserCredential = await firebaseCreateUser(auth, email, password);
    console.log('User created successfully:', result.user);
    alert('Your account has been created successfully! Welcome aboard!');
    return result.user;
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Oops! We couldn\'t create your account. Please try again later.');
    throw error;
  }
};
