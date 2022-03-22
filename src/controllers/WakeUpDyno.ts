import fetch from 'node-fetch';

const WakeUpDyno = (url: string) => {
  const milliseconds = 25 * 60000;
  setTimeout(async () => {
    try {
      console.log('Task     :: setTimeout called.');
      // HTTP GET request to the dyno's url
      await fetch(url);
      console.log(`Task     :: Fetching ${url}.`);
    } catch (error) {
      const err = error as Error;
      // catch fetch errors
      console.log(`Task     :: Error fetching ${url}: ${err.message} 
            Will try again in 25 minutes...`);
    }
  }, milliseconds);
};

export default WakeUpDyno;
