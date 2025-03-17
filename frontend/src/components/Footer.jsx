import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 bg-gray-900">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between ">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
            >
              <img src={logo} alt="logo" className="h-20" />
            </Link>
          </div>
          <div className="grid grid-cols-4 mt-4 sm:grid-cols-4 sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
            </div>
            <div className="">
              <Footer.Title title="Packages" />
            </div>
            <div className="">
              <Footer.Title title="Contact" />
            </div>
            <div className="">
              <Footer.Title title="Privacy Policy" />
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="">
          <Footer.Copyright
            href="#"
            by="ShanConstructions. All rights reserved"
            year={new Date().getFullYear()}
          />
        </div>
      </div>
    </Footer>
  );
}
