const timeout = 5000;
require('dotenv').config()

describe(
  'suite de testes com Puppeteer',
  () => {
    let page

    const menu = '.Button-label'
    const login = '[href="/login"]'
    const loginInput = '#login_field' 
    const passwordInput = '#password'

    beforeAll(async () => {
      page = await globalThis.__BROWSER_GLOBAL__.newPage()
      await page.goto('https://github.com')
    }, timeout);

    it('Browser precisa se conectar com a internet. ', async () => {
      const connection = await globalThis.__BROWSER_GLOBAL__.isConnected()
      try {
        
        expect(connection).toBeTruthy()
      } catch (error) {
        console.log({message: "Browser conectado, FALHOU. "})
      }
    })

    it('Acessar pagina do  GitHub. ', async () => {
      const pageURL = await page.url()
      try {
        
        expect(pageURL).toBe('https://github.com/')
      } catch (error) {
        console.log({message:"Acessar pagina:'https://github.com', FALHOU."})
      }
    })

    it('Acessar pagina de Login.', async () => {
      
        await page.waitForSelector(menu)
        await page.click(menu)
        await page.waitForSelector(login)
        await page.click(login)
        await page.waitForSelector(loginInput)
        const pageURL = await page.url()
      try {
        expect(pageURL).toBe('https://github.com/login')
        
      } catch (error) {
        console.log({ message: "Acessar página de Login Falhou."})
      }
    })

    it('Preencher Inputs de email e senha.', async () => {

      await page.waitForSelector(loginInput)
      await page.type(loginInput, process.env.USER || process.env.EMAIL)
      await page.type(passwordInput, process.env.PASSWORD)
      let notEmpty
      const loginValue = await page.$eval(loginInput, el => el.value)
      const passWordValue = await page.$eval(passwordInput, el => el.value)
      notEmpty = (loginValue!=="" && passWordValue!==""? true:false)
      console.log(notEmpty)
      try {
        expect(notEmpty).toBeTruthy()
      } catch (error) {
        console.log({message: "Preencher Inputs de email e senha, FALHOU."})
      }
    })

    it('Realizar autenticação/login', async () => {
      
      await page.waitForSelector('[type="submit"]')
      await page.click('[type="submit"]')
      await page.waitForSelector('.logged-in')
      const loggedIn = await page.$$eval('.logged-in', el => el.length !== 0);
      try {
        
        expect(loggedIn).toBeTruthy() 
      } catch (error) {
        console.log({message:"Confirmação de login, Falhou"})
      }
    })

    it('Checar redirecionamento para pagina correta.', async () => {
      const url = page.url() === 'https://github.com/'
      const loggedIn = await page.$$eval('.logged-in', el => el.length !== 0)
      const expectedUrl = (url && loggedIn? true:false)
      try {
        
        expect(expectedUrl).toBeTruthy()
      } catch (error) {
        console.log({message:"Redirecionamento para pagina correta, Falhou"})
      }
    })

    it('Validar nome do Usuário abaixo da foto do perfil.', async () => {

      await page.waitForSelector('[aria-label="View profile and more"]')
      await page.click('[aria-label="View profile and more"]')
      await page.waitForSelector('[data-ga-click="Header, go to profile, text:your profile"]')
      await page.click('[data-ga-click="Header, go to profile, text:your profile"]')
      await page.waitForSelector('[itemprop="name"]')
      const name = await page.$eval('[itemprop="name"]', el => el.textContent)
      try {
        
        expect(name.trim()).toBe(process.env.NAME)
      } catch (error) {
        console.log({message:"Confirmação nome de nome do usuário, FALHOU."})
      }
    })

    it('Navegar até a aba Repositories', async () => {

      let pageURL
      const user = await page.$eval('.p-nickname', el => el.textContent.replace('\n', "").trim())
      await page.waitForSelector('[aria-label="View profile and more"]')
      await page.click('[aria-label="View profile and more"]')
      await page.waitForSelector('[data-ga-click="Header, go to profile, text:your profile"]')
      await page.click('[data-ga-click="Header, go to profile, text:your profile"]')
      await page.waitForSelector('[data-tab-item="repositories"]')
      await page.click('[data-tab-item="repositories"]')
      await page.waitForNavigation({waitUntil: 'networkidle0'})
      pageURL = await page.url()
      try {
        expect(pageURL).toBe(`https://github.com/${user}?tab=repositories`)
        
      } catch (error) {
        console.log({ Message:"Ir para aba de repositórios falhou."})
      }
      
    })

    it('Acessar Repositório aleatório do perfil', async () => {
      
      const options = await page.$$eval('[itemprop="name codeRepository"]', options => {
        return options.map(option => option.textContent.replace('\n', "").trim());
      })
      const randomNumber = Math.floor(Math.random()*options.length) - 1
      const randomRepo = options[options.length === 1? 0:randomNumber]
      const user = await page.$eval('.p-nickname', el => el.textContent.replace('\n', "").trim())
      const randomRepoUrl = `https://github.com/${user}/${randomRepo}`
      await page.goto(randomRepoUrl)
      const evalTestPullRequest =  await page.$$eval('#pull-requests-tab', el => el)
      try {
        
        expect(evalTestPullRequest).toHaveLength(1)
      } catch (error) {
        console.log({message:"Acessar repositório aleatório, FALHOU."})
      }
    })

    it('Navega até a aba "Pull Request"', async () => {
      const repoURL = await page.url()
      await page.waitForSelector('#pull-requests-tab')
      await page.click('#pull-requests-tab')
      await page.waitForSelector('[data-ga-click="Repository, go to compare view, location:pull request list; text:New pull request"]')
      const urlAtual = await page.url()
      try {
        
        expect(urlAtual).toBe(`${repoURL}/pulls`)
      } catch (error) {
        console.log({message:"Navegar até aba PullRequest, FALHOU."})
      }

    })

    it('Deslogar do github.', async () => {
      await page.waitForSelector('[aria-label="View profile and more"]')
      await page.click('[aria-label="View profile and more"]')
      await page.waitForSelector('.dropdown-signout')
      await page.click('.dropdown-signout')
      await page.waitForNavigation()
      const evalEmpty = await page.$$eval('.logged-in', el => el.length === 0)
      try {
        
        expect(evalEmpty).toBeTruthy()
      } catch (error) {
        console.log({message:"Logout, FALHOU."})
      }
    })

    it('Verificar se o logout foi feito com sucesso', async () => {
      await page.waitForSelector('.logged-out')
      const loggedOut = await page.$$eval('.logged-out', el => el.length !== 0)
      try {
        
        expect(loggedOut).toBeTruthy()
      } catch (error) {
        console.log({message: "Verificar logout efetuado, FALHOU"})
      }
    
    })

  },
  timeout,
)