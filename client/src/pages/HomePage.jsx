import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="bg-gray-50 bg-[url('./assets/bg.png')] bg-cover bg-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Understand User Flow.
            <strong className="font-extrabold text-teal-600 sm:block">
              {" "}
              Increase Conversion.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-600 sm:w-auto"
              to="/login"
            >
              Get Started
            </Link>

            <Link
              className="block w-full bg-white rounded px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-800 focus:outline-none focus:ring active:text-teal-600 sm:w-auto "
              to="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
