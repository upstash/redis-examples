import logo from './logo.svg';
import './App.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";

function App() {

    useEffect(() => {
        async function fetchData() {
            try {
                let version = localStorage.getItem("notification-version");
                version = version ? version : 0;
                const response = await fetch("REPLACE_UPSTASH_REDIS_REST_URL/zrevrangebyscore/messages/+inf/" + version + "/WITHSCORES/LIMIT/0/1", {
                    headers: {
                        Authorization: "Bearer REPLACE_UPSTASH_REDIS_REST_TOKEN"
                    }
                });
                const res = await response.json();
                const v = parseInt(res.result[1]);
                if (v) {
                    localStorage.setItem("notification-version", v + 1)
                }
                toast(res.result[0]);
            } catch (e) {
                console.error(e);
            }
        };
         fetchData();
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <ToastContainer/>
        </div>
    );
}

export default App;
