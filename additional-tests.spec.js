import exp from 'constants';

// @ts-check
const { test, expect} = require('@playwright/test');

//show browser
const launchOptions = {
   headless: false,
 };
 
 test.use({ 
   browserName: 'chromium',
   launchOptions,
 });


const websiteURL = 'https://ravinder-sanghera.github.io/searchpeople.html';
// const websiteURL = 'http://127.0.0.1:5500/searchpeople.html';

test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
});

// tests

test ('invalid people searches', async ({page}) => {
    //print error when fields are empty
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#results').locator('div')).toHaveCount(0)
    await expect(page.locator('#message')).toContainText('Error')
 
    //print error when both fields are filled
    await page.locator('#name').fill('rachel')
    await page.locator('#license').fill('GHT56FN')
    await expect(page.locator('#results').locator('div')).toHaveCount(0)
    await expect(page.locator('#message')).toContainText('Error')
})

test ('missing people searches', async ({page}) => {
    //print message when no person is found
    await page.locator('#name').fill('ravinder')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#results').locator('div')).toHaveCount(0)
    await expect(page.locator('#message')).toContainText('No result found')
})
 
test ('invalid vehicle searches', async ({page}) => {//
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    //print error when field is empty
    await page.waitForTimeout(500); //wait to allow the page to load
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#results').locator('div')).toHaveCount(0)
    await expect(page.locator('#message')).toContainText('Error')
})

test ('missing vehicle searches', async ({page}) => {
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    await page.waitForTimeout(500); //wait to allow the page to load
    //print message when no vehicle is found
    await page.locator('#rego').fill('abc')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#results').locator('div')).toHaveCount(0)
    await expect(page.locator('#message')).toContainText('No result found')
})

test ('invalid vehicle added', async ({page}) => {
    await page.getByRole('link', { name: 'Add a vehicle' }).click();
    await page.waitForTimeout(500); //wait to allow the page to load
    //print error when a field is empty
    await page.getByRole('button', { name: 'Add vehicle' }).click();
    await expect(page.locator('#message')).toContainText('Error')

    await page.locator('#rego').fill('LKJ23UO')
    await page.locator('#make').fill('Porsche')
    await page.locator('#model').fill('Taycan')
    await page.locator('#colour').fill('white')
    await page.locator('#owner').fill('bob')
    await page.getByRole('button', { name: 'Add vehicle' }).click();
    await page.getByRole('button', { name: 'Add owner' }).click();
    await expect(page.locator('#message')).toContainText('Error')
})