/* eslint-disable @next/next/no-img-element */
// import { signIn, signOut, useSession } from "next-auth/client";

// export default function Page() {
//   const [session, loading] = useSession();

//   return (
//     <>
//       {!session && (
//         <>
//           Not signed in <br />
//           <button onClick={() => signIn()}>Sign in</button>
//         </>
//       )}
//       {session && (
//         <>
//           Signed in as {session.user.email} <br />
//           <button onClick={() => signOut()}>Sign out</button>
//         </>
//       )}
//     </>
//   );
// }

import { useState } from "react";
import NewWindow from "react-new-window";
import { signIn, signOut, useSession } from "next-auth/client";
import { IconContext } from "react-icons";
import React from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import Toolbar from "../components/Toolbar";
import styles from "../styles/Home.module.css";
import s from "../styles/Signin.module.css";
import Head from "next/head";
import { FaFacebookF } from "react-icons/fa";
import router from "next/router";
import Image from "next/image";

const Page = () => {
  const [popup, setPopUp] = useState(false);
  const [session, loading] = useSession();

  return (
    <React.Fragment>
      <Head>
        <title>Sign In</title>
      </Head>
      <Toolbar />
      {!session && (
        // To Keep signin page in the app which has taskbar
        <div className={styles.app__inner}>
          <div className={s.in__view}>
            <div className={s.in__container}>
              <div style={{ width: "100%" }}>
                <span className={s.in__heading}>Sign In With</span>
                <div>
                  <h3>Email</h3>
                  <input type="email" name="email" className={s.in__input} />
                  <h3>Password</h3>
                  <input
                    type="password"
                    name="password"
                    className={s.in__input}
                  />
                </div>

                <div
                  className={`${s.in__logo} ${s.in__google}`}
                  onClick={() => signIn("google")}
                >
                  <FcGoogle size="1.5rem" style={{ marginRight: "10px" }} />
                  <h4>Sign in with Google</h4>
                </div>
                <button
                  className={`${s.in__logo} ${s.in__facebook}`}
                  onClick={() => signIn("facebook")}
                >
                  <FaFacebookF
                    size="2rem"
                    fill="#fff"
                    style={{ marginRight: "10px" }}
                  />
                  <h4>Sign in with Facebook</h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {session && (
        <div className={styles.app__inner}>
          <div className={s.in__user}>
            <h1 className={s.in__name}>Welcome {session.user.name}</h1>
            <img src={session.user.image} alt="user Image" />
          </div>
        </div>
      )}

      {/* {popup && !session ? (
        <NewWindow
          url="/sign-in"
          center="screen"
          onUnload={() => setPopUp(false)}
        />
      ) : null} */}
    </React.Fragment>
    // <div>
    //   {loading ? (
    //     <p>loading session...</p>
    //   ) : session ? (
    //     <>
    //       Signed in as {session.user.email} <br />
    //       <h1>Hello {session.user.name}</h1>
    //       <button onClick={() => signOut()}>Logout</button>
    //     </>
    //   ) : (
    //     <>
    //       <button onClick={() => setPopUp(true)}>Login</button>
    //     </>
    //   )}

    //   {popup && !session ? (
    //     <NewWindow
    //       url="/sign-in"
    //       center="screen"
    //       onUnload={() => setPopUp(false)}
    //     />
    //   ) : null}
    // </div>
  );
};

export default Page;
