"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (!code) return;
    const clientID = process.env.NEXT_PUBLIC_COGINTO_CLIENT_ID || "";
    const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || "";
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "";
    const credentials = `${clientID}:${clientSecret}`;
    const base64Credentials = Buffer.from(credentials).toString("base64");
    const basicAuthorization = `Basic ${base64Credentials}`;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthorization,
    };
    const data = new URLSearchParams();
    let token = "";
    data.append("grant_type", "authorization_code");
    data.append("client_id", clientID);
    data.append("code", code);
    data.append("redirect_uri", "http://localhost:3000");
    axios
      .post(
        `${cognitoDomain}/oauth2/token`,
        data,
        { headers }
      )
      .then((res) => {
        if (res.status != 200) return;
        token = res?.data?.access_token;
        const userInfoHeaders = {
          Authorization: "Bearer " + token,
        };
        axios
          .get(
            `${cognitoDomain}/oauth2/userInfo`,
            { headers: userInfoHeaders }
          )
          .then((userInfo) => {
            if (userInfo.status != 200) return;
            setName(userInfo.data?.username);
            setEmail(userInfo.data?.email);
          });
      });
  }, [code]);

  return (
    <main className={styles.main}>
      <div className={styles.description}></div>

      <div className={styles.center}>
        <Image
          src="/5minslearn.png"
          alt="5minslearn Logo"
          width={200}
          height={200}
        />
      </div>
      <h2 className={inter.className}>Welcome to 5minslearn!</h2>
      {name && email ? (
        <>
          <h2 className={inter.className}>{name}</h2>
          <p className={inter.className}>{email}</p>
        </>
      ) : (
        <></>
      )}

      <div className={styles.center}>
        <a
          href="https://5minslearn.gogosoon.com/?ref=github_nextjs_app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            5minslearn <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Learn tech in 5mins</p>
        </a>
      </div>
    </main>
  );
}
