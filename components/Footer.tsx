 
import MyBrand from "./MyBrand";
import {SocialIcon} from 'react-social-icons'

type Props = {};

const accounts = [
  {network: "twitter", url: "https://twitter.com"},
  {network: "linkedin", url: "https://linkedin.com"},
  {network: "instagram", url: "https://instagram.com"},
]

export default function Footer({}: Props) {
  return (
    <footer className="py-10 border-t-2 border-slate-300 px-5 lg:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          <div className="w-4/5 md:w-3/5 lg:w-2/5">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
              sit porro totam repellat voluptatibus atque possimus cumque.
              Doloremque magni, nam aspernatur facilis ad mollitia ut at quam, cum
              labore pariatur!
            </p>
          </div>

          <div>
            <MyBrand />
            <div className="flex items-center gap-x-3 mt-5">
              {accounts.map(account => (
                <SocialIcon key={account.network} target="_blank" network={account.network} url={account.url} style={{ height: 30, width: 30 }} />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-10 block">Copyright 2023</p>
      </div>
    </footer>
  );
}
