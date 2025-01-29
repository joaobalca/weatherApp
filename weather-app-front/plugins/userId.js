import { v4 as uuidv4 } from 'uuid';

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const generateUserId = () => {
      let userId = localStorage.getItem('userId');

      if (!userId) {
        userId = uuidv4();
        localStorage.setItem('userId', userId); 
      }

      return userId;
    };

    const userId = generateUserId();
    console.log('Generated User ID:', userId);

    return {
      provide: {
        userId,
      },
    };
  }
});
