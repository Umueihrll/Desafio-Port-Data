const puppeteer = require('puppeteer')
require('dotenv').config()

const loginInput = '#login_field'    
const passwordInput = '#password'
const menu = '.Button-label'
const login = '[href="/login"]'
const timeout = 1000


async function chamaEu()  {

  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  

  await page.goto('https://github.com',)
  await page.waitForSelector(menu)
  await page.click(menu)

  await page.waitForSelector(login)
  await page.click(login)

  await page.waitForSelector(loginInput)
  await page.type(loginInput, process.env.USER)
  await page.type(passwordInput, process.env.PASSWORD)
  await page.waitForSelector('[type="submit"]')
  await page.click('[type="submit"]')
  try {
    await page.authenticate({username: process.env.USER, password: process.env.PASSWORD})
    then
  } catch (error) {
    
  }

  await page.waitForSelector('[aria-label="View profile and more"]')
  await page.click('[aria-label="View profile and more"]')
  
  await page.waitForSelector('[data-ga-click="Header, go to profile, text:your profile"]')
  await page.click('[data-ga-click="Header, go to profile, text:your profile"]')
  
  await page.waitForSelector('[data-tab-item="repositories"]')
  await page.click('[data-tab-item="repositories"]')

  await page.waitForSelector('[itemprop="name codeRepository"]')
  const options = await page.$$eval('[itemprop="name codeRepository"]', options => {
      return options.map(option => option.textContent.replace('\n', "").trim());
    })//return an array with the name of all repositories.
  
  const randomNumber = Math.floor(Math.random()*options.length) - 1
  const randomRepo = options[options.length === 1? 0:randomNumber]
  const user = await page.$eval('.p-nickname', el => el.textContent.replace('\n', "").trim())
  const randomRepoUrl = `https://github.com/${user}/${randomRepo}`
  await page.goto(randomRepoUrl)
  await page.waitForSelector('#pull-requests-tab')
  await page.click('#pull-requests-tab')
  

  await page.waitForSelector('[aria-label="View profile and more"]')
  await page.click('[aria-label="View profile and more"]')
  
  await page.waitForSelector('.dropdown-signout')
  await page.click('.dropdown-signout')

  await page.waitForSelector('.logged-out')
  
  browser.close()

    
}

chamaEu()

