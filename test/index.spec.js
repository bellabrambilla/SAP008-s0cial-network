// importamos la funcion que vamos a testear
import {signInWithGoogle, signUp} from '../src/lib/services.js';
import {signInWithPopup, createUserWithEmailAndPassword} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js')

describe('signInWithGoogle', () => {
  it('should be called once', () => {
    signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('signUp', () => {
  it('should be called once', () => {
    const email= 'admin@gmail.com'
    const password= 'admin123'
    signUp(email,password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined,email,password);
  });
});
