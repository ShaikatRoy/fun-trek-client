import { motion } from "framer-motion";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <motion.div
      className="w-4/12 mx-auto my-8 text-center"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-yellow-600 mb-2">---{subHeading}---</p>
      <motion.h3
        className="text-4xl uppercase border-y-4 py-4"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {heading}
      </motion.h3>
    </motion.div>
  );
};

export default SectionTitle;
