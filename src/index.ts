import express from 'express';

// this require is necessary for server HMR to recover from error
// tslint:disable-next-line:no-var-requires
let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    // tslint:disable-next-line
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      // tslint:disable-next-line
      console.error(error);
    }
  });
  // tslint:disable-next-line
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err: Error) => {
    if (err) {
      // tslint:disable-next-line
      console.error(err);
      return;
    }
    // tslint:disable-next-line
    console.log(`> Started on port ${port}`);
  });
