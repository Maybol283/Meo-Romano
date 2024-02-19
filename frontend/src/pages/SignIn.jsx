import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminModal from "../components/AdminModal";

export default function SignIn() {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    try {
      if (pin != "000000") {
        navigate(`/update-manager?pin=${pin}`);
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setPin(e.target.value); // Correctly updates the pin state with the new value
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Find your booking
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div>
            <label
              htmlFor="pin"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter your pin below
            </label>
            <div className="mt-1">
              <input
                value={pin}
                onChange={handleChange}
                id="pin"
                name="pin"
                type="text"
                autoComplete="off"
                required
                className="appearance-none block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <AdminModal open={open} setOpen={setOpen} />
    </div>
  );
}
