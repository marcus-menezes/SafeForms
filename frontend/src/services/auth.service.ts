import { auth } from "@/lib/firebase";
import { IPasswordResetRequest, ISignInRequest, ISignUpRequest } from "@/models/auth";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

export const AuthApi = {
  signIn: ({ email, password }: ISignInRequest) =>
    signInWithEmailAndPassword(auth, email, password),

  signUp: ({ email, password }: ISignUpRequest) =>
    createUserWithEmailAndPassword(auth, email, password),

  passwordReset: ({ email }: IPasswordResetRequest) =>
    sendPasswordResetEmail(auth, email),
};