import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";
import Script from "next/script";
import Image from "next/legacy/image";

const NavigationBar = () => {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <div id="title"> </div>
      <Script id="script-title" strategy="lazyOnload">
        {`document.getElementById("title").innerHTML = "Navbar"`}
      </Script>
      <div className={styles.profile}>
        {data?.user?.image && (
          // <img
          //   className={styles.avatar}
          //   src={data.user.image}
          //   alt={data.user.fullname}
          // />
          <Image
            src={data.user.image}
            alt={data.user.fullname}
            width={30}
            height={30}
            className={styles.avatar}
          />
        )}
        {data && data.user.fullname}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
