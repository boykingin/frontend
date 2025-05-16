import { IconButton } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { Navbar, NavbarBrand } from "flowbite-react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

function NavbarComp() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "") {
      setTerm(value);
      navigate({
        to: "/",
        search: { term: e.target.value },
      });
    } else {
      setTerm(value);
      navigate({
        to: "/",
      });
    }
  };

  return (
    <Navbar className="mb-[30px] sticky top-0 z-10 shadow flex flex-row">
      <NavbarBrand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          DevSnips
        </span>
      </NavbarBrand>
      <div className="max-w-[60%] min-w-[50%] flex w-[60%]">
        <Link to="/add">
          <IconButton aria-label="new" color="primary">
            <FaPlus color="green" />
          </IconButton>
        </Link>
        <input
          className="mr-3 w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search.."
          value={term}
          onChange={handleSearchChange}
        />
      </div>
    </Navbar>
  );
}

export default NavbarComp;
