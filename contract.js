/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
/* global ethereum MetamaskOnboarding */
// const currentUrl = new URL(window.location.href)
const forwarderOrigin = 'http://localhost:9010'

// Basic Actions Section
const connectButton = document.getElementById('mint-btn0')
const showAccount = document.querySelector('.showAccount')
const dialogBox = document.querySelector('.dialog-box')
const adressBox = document.querySelector('.adress-box')
const costBox = document.getElementById('cost-box')
const walletConntectButton = document.getElementById('connect-wallet')

// eslint-disable-next-line prefer-const
let inputAmount = document.getElementById('input-amount')
// eslint-disable-next-line prefer-const
// let walletAddress = document.getElementById('input-address')
// eslint-disable-next-line prefer-const
let mintButton = document.getElementById('mint-btn')

const initialize = () => {

  // Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }

  // We create a new MetaMask onboarding object to use in our app
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  // This will start the onboarding proccess
  function onClickInstall () {
    connectButton.innerText = 'Onboarding in progress'
    connectButton.disabled = true
    // On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding()
  }

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' })
      getAccount()
    } catch (error) {
      console.error(error)
    }
  }

  const onClickWalletConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' })
      // eslint-disable-next-line no-undef
      accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      // eslint-disable-next-line prefer-destructuring
      const account = accounts[0]
      adressBox.classList.add('active')
      showAccount.innerHTML = account
    } catch (error) {
      console.error(error)
    }
  }

  // ------Inserted Code------\\
  const MetaMaskClientCheck = () => {
    // Now we check to see if Metmask is installed
    // eslint-disable-next-line no-negated-condition
    if (!isMetaMaskInstalled()) {
      // If it isn't installed we ask the user to click to install it
      connectButton.innerText = 'Click here to install MetaMask!'
      walletConntectButton.innerText = 'Click here to install MetaMask!'
      // When the button is clicked we call th is function
      connectButton.onclick = onClickInstall
      walletConntectButton.onclick = onClickInstall
      // The button is now disabled
      connectButton.disabled = false
    } else {
      // If MetaMask is installed we ask the user to connect to their wallet
      connectButton.innerText = 'Mint Now'
      walletConntectButton.innerText = 'Connect'
      // When the button is clicked we call this function to connect the users MetaMask Wallet
      connectButton.onclick = onClickConnect
      walletConntectButton.onclick = onClickWalletConnect
      // The button is now disabled
      connectButton.disabled = false
    }
  }
  MetaMaskClientCheck()

  mintButton.disabled = true
  inputAmount.addEventListener('input', function () {
    if (inputAmount.value.length === 0) {
      mintButton.disabled = true
    } else {
      // if (walletAddress.value.length !== 0) {
      //   mintButton.disabled = false
      // }
      mintButton.disabled = false
      // eslint-disable-next-line no-undef
      cost = inputAmount.value * 0.2
      // eslint-disable-next-line no-undef
      cost = cost.toFixed(2)
      // eslint-disable-next-line no-undef
      costBox.innerHTML = cost
    }
  })

  // walletAddress.addEventListener('input', function () {
  //   if (walletAddress.value.length === 0) {
  //     mintButton.disabled = true
  //   } else if (inputAmount.value.length !== 0) {
  //     mintButton.disabled = false
  //   }
  // })

  async function getAccount () {
    // eslint-disable-next-line no-undef
    accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    // eslint-disable-next-line prefer-destructuring
    const account = accounts[0]
    adressBox.classList.add('active')
    showAccount.innerHTML = account
    openDialog()
  }

  function openDialog () {
    dialogBox.classList.add('active')
  }

  mintButton.addEventListener('click', () => {
    // price = 0.2;
    // eslint-disable-next-line no-undef
    amount = inputAmount.value
    // eslint-disable-next-line no-undef
    price = 200000000000000000
    // eslint-disable-next-line no-undef
    orderAmount = amount * price

    // eslint-disable-next-line no-undef
    hexString = orderAmount.toString(16)

    getAccount()
    successDialog()
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [{
          // eslint-disable-next-line no-undef
          from: accounts[0],
          to: '0x3d8CD3bbDF3475B3882C0f3Ac0fA184FF5730eC4',
          // eslint-disable-next-line no-undef
          value: hexString,
          gasPrice: '746528800',
        }],
      })
      .then((txHash) => console.log(txHash))
      .catch((_error) => console.error)
  })

  // eslint-disable-next-line no-empty-function
  function successDialog () {
  }
}
window.addEventListener('DOMContentLoaded', initialize)
