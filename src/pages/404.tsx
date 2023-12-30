import React from "react";
import styles from "@/styles/404.module.scss";
import Head from "next/head";
import Image from "next/legacy/image";
const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Head>
        <title>404</title>
      </Head>
      {/* <img src="/404.svg" alt="404" className={styles.error__image} /> */}
      <Image
        src="/404.svg"
        alt="404"
        width={500}
        height={500}
        className={styles.error_image}
      />
      <h1 className="mt-10">Halaman Tidak Ditemukan</h1>
    </div>
  );
};

export default Custom404;
