'use server';
import { createAdminClient } from "@/config/appwrite";
import { ID } from 'node-appwrite';

async function createUser(previousState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');

  if (!email || !name || !password) {
    return {
      error: 'Please fill in all fields'
    }
  }

  if (password.length < 8) {
    return {
      error: 'Please use a longer password (minimum 8 characters)'
    }
  }

  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match'
    }
  }

  // get account instance
  const { account } = await createAdminClient();
  try {
    // create user
    await account.create(ID.unique(), email, password, name);
    return {
      success: true
    }
  } catch (error) {
    console.log('registration error: ', error);
    return {
      error: 'registration failed'
    }
  }
}

export default createUser;
