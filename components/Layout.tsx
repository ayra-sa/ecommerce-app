import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
  headContext: HeadContext;
};

export default function Layout({ children, headContext }: Props) {
  const { title, meta } = headContext;

  return (
    <>
      <Head>
        <title>{title}</title>
        {meta.map(({ property, content, key, name }) => (
          <meta
            name={name || ""}
            content={content || ""}
            property={property || ""}
            key={key || ""}
          />
        ))}
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
