import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
    gql, useQuery,
} from "@apollo/client";
import React from "react";


const GET_COIN_LIST = gql`
    query {
        redisLRange(key : "coins", start: 0, stop: 6)
    }
`;

export default function Home() {
    let coins = []
    const {loading, error, data} = useQuery(GET_COIN_LIST);

    if (!loading && !error) {
        for(let x of data.redisLRange) {
            let dd = JSON.parse(x);
            coins.push(dd)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h3 className={styles.title}>
                    Coin Price List
                </h3>

                <div className={styles.grid}>
                    <table className={styles.coins}>
                        <tbody>
                        {!loading ? (
                            coins.map((item, ind) => (
                                <tr key={ind}>
                                    <td>
                                        <img src={item.image}
                                             width="25"/>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td className={styles.price}>
                                        ${item.price}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>
                                    <img src="/loader.gif"/>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                </div>
            </main>

            <footer className={styles.footer}>
                <p className={styles.description}>
                    <a href="https://docs.upstash.com"> Click for the tutorial </a>
                </p>

            </footer>
        </div>
    )
}
