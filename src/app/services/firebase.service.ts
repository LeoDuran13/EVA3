import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);

  //========================================AUTENTICACION====================================

  //=========ACCEDER
  singIN(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //=========Registrar
  singUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //=========ACtualizar usuario
  updateUser(displayName:string){
    return updateProfile(getAuth().currentUser, {displayName})
  }

  }



