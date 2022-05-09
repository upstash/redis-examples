import styles from '../styles/Home.module.css'

import Showcase from '../components/sampleComponent'

import detectEthereumProvider from '@metamask/detect-provider'
import { useState, useEffect } from 'react'

import { Button, TextField } from '@mui/material'


export default function Home() {

  const [accountAddress, setAccountAddress] = useState(null)

  const [themePreference, setThemePreference] = useState("light")
  const [greetingMessage, setGreetingMessage] = useState("Anonymous Person")

  const [userSettings, setUserSettings] = useState(null)

  useEffect(() => {
    checkConnection()
    getPreferences()
  }, [accountAddress])


  async function checkConnection() {
    const provider = await detectEthereumProvider()
    if (provider) {
      provider
        .request({ method: 'eth_accounts' })
        .then(accounts => {
          setAccountAddress(accounts[0])
        })
        .catch(console.log)
    } else {
      console.log("Not connected, window.ethereum not found")
    }
  }

  async function connect() {
    const provider = await detectEthereumProvider()
    console.log("provider:", provider)

    if (provider) {
      console.log('Ethereum successfully detected!')
      provider.request({ method: "eth_requestAccounts" }).then((accounts) => {
        if (!accountAddress) {
          setAccountAddress(accounts[0])
        }
      }).catch((err) => console.log(err))
      // : alert("Please install MetaMask")

      console.log("window.ethereum:", window.ethereum)
      getPreferences()
    } else {
      alert('Please install MetaMask!')
    }
  }

  async function setPreferences(themePreference, greetingMessage) {
    if (accountAddress) {
      const res = await fetch(`/api/store`, {
        method: "POST",
        body: JSON.stringify({
          accountID: accountAddress,
          themePreference: themePreference,
          greetingMessage: greetingMessage,
        })
      })
      const data = await res.json()
    }
    else {
      alert("No account address detected")
    }
  }

  async function getPreferences(e) {
    if (accountAddress) {
      console.log("Fetching user preferences...")
      const res = await fetch(`/api/${accountAddress}`, { method: "GET" })
      const data = await res.json()

      setUserSettings(data.result)
      if (data.result) {
        setThemePreference(data.result.themePreference)
        setGreetingMessage(data.result.greetingMessage)
      }
    }
    else {
      console.log("No account connected yet!")
    }
  }

  async function handleDarkMode(e) {
    console.log("themePreference:", themePreference)
    const newPreference = themePreference == "light" ? "dark" : "light"
    setThemePreference(newPreference)
    await setPreferences(newPreference, greetingMessage)
    await getPreferences()
  }

  async function takeGreetingMessage(e) {
    if (e.keyCode == 13) {
      const message = e.target.value
      setGreetingMessage(message)
      console.log(message)
      await setPreferences(themePreference, message)
      await getPreferences()
      e.target.value = ""
    }
  }

  return (
    <div className={styles.container}>

      <h2>Web3 Preferences Holder</h2>
      <Button variant="contained" onClick={connect}>Connect Metamask</Button>
      <p>
        Lets you keep user preferences on cross-websites
      </p>
      <br />
      <p>For example, take a greeter message from user.</p>
      <TextField label="Call me..." variant="outlined" size="small" onKeyDown={takeGreetingMessage} />
      <br />
      <br />

      <Button onClick={handleDarkMode} variant="contained" size="small" style={{ backgroundColor: "#3D3B3B" }} > Switch Dark Mode </Button>

      <p>Sample Component/Page:</p>
      <Showcase userSettings={userSettings} />

    </div>

  )
}
