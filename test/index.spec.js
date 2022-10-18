// importamos la funcion que vamos a testear
import { signInWithGoogle, signUp, logInWithEmailAndPassword } from '../src/lib/services.js';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');

describe('signInWithGoogle', () => {
  it('should be called once', () => {
    signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

// display name tbm
describe('signUp', () => {
  it('should be called once', () => {
    const email = 'admin@gmail.com';
    const password = 'admin123';
    signUp(email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
  });
});

describe('loginWithEmailAndPassword', () => {
  it('should be called once', () => {
    const email = 'admin@gmail.com';
    const password = 'admin123';
    logInWithEmailAndPassword(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
  });
});
