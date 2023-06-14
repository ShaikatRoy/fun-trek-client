import { motion } from 'framer-motion';

const JoinUs = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="join-us-section py-12 text-white bg-gradient-to-br from-black via-gray-800 to-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex flex-col items-center rounded-lg">
        <h2 className="text-4xl font-bold mb-4">Join Us This Summer!</h2>
        <p className="text-lg mb-8">Experience the best summer camp for your kids.</p>
        <motion.img
          src="https://i.ibb.co/jJ8GXQF/pexels-photo-8083819.jpg"
          alt="Summer Camp"
          className="w-64 h-64 rounded-full object-cover"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
    </motion.div>
  );
};

export default JoinUs;
