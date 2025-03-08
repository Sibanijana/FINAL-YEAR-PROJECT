import { motion } from "framer-motion";

const LogoTicker = () => {
  // Sample logos (replace with actual logos later)
  const logos = [
    { name: "Acme", logo: "/assets/logo-acme.png" },
    { name: "Apex", logo: "/assets/logo-apex.png" },
    { name: "Celestial", logo: "/assets/logo-celestial.png" },
    { name: "Echo", logo: "/assets/logo-echo.png" },
    { name: "Pulse", logo: "/assets/logo-pulse.png" },
    { name: "Quantum", logo: "/assets/logo-quantum.png" },
  ];

  // Duplicate the logos array multiple times to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-12 min-w-[120px]"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-full mb-2 w-full" // Adjust the height as needed
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
