// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['html'],
  ['allure-playwright']
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { 
        browserName:'chromium', 
        headless: false, 
        trace: 'on',
        screenshot: 'on',
        //viewport: {width:720,height:720},
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        video:'retain-on-failure',
        //...devices['Pixel 5 landscape']

      }
    },
      {
        name: 'safari',
      use: { 
        browserName:'webkit', 
        headless: false, 
        trace: 'on',
        screenshot: 'on',
        ...devices['Galaxy Z Fold 7 landscape']
      }
   }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

