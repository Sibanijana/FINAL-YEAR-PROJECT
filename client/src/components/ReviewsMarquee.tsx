import { motion } from "framer-motion";

const ReviewsMarquee = () => {
  const reviews = [
    {
      name: "Alex Johnson",
      role: "Marketing Manager",
      comment:
        "This system transformed how I organize my workday. I've never been more productive!",
      rating: 5,
      avatar: "A",
    },
    {
      name: "Samantha Davis",
      role: "Freelance Designer",
      comment:
        "The habit tracking feature helped me establish a consistent work routine. Highly recommend!",
      rating: 5,
      avatar: "S",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      comment:
        "Perfect for balancing my coding tasks with personal projects. Clean interface and intuitive design.",
      rating: 4,
      avatar: "M",
    },
    {
      name: "Emily Wilson",
      role: "Student",
      comment:
        "Helps me stay on top of assignments and extracurriculars. The reminder system is a lifesaver!",
      rating: 5,
      avatar: "E",
    },
    {
      name: "David Kim",
      role: "Entrepreneur",
      comment:
        "I've tried many productivity apps, but this one strikes the perfect balance of features and simplicity.",
      rating: 4,
      avatar: "D",
    },
    {
      name: "Jessica Martinez",
      role: "Health Coach",
      comment:
        "I recommend this to all my clients for building healthy habits. The progress tracking is excellent.",
      rating: 5,
      avatar: "J",
    },
  ];

  // Create three rows with different speeds
  const row1 = reviews.slice(0, 2);
  const row2 = reviews.slice(2, 4);
  const row3 = reviews.slice(4, 6);

  // Duplicate each row multiple times to create a seamless loop
  const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2, ...row2, ...row2];
  const duplicatedRow3 = [...row3, ...row3, ...row3, ...row3, ...row3, ...row3];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ));
  };

  const ReviewRow = ({
    reviews,
    duration,
    direction,
  }: {
    reviews: typeof row1;
    duration: number;
    direction: "normal" | "reverse";
  }) => (
    <motion.div
      className="flex py-4"
      animate={{
        x: direction === "normal" ? [-2000, 0] : [0, -2000],
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        },
      }}
    >
      {reviews.map((review, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 mx-4 min-w-[300px] max-w-[300px]"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-teal-100 text-teal-800 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
              {review.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{review.name}</h3>
              <p className="text-sm text-gray-600">{review.role}</p>
            </div>
          </div>
          <div className="mb-3">{renderStars(review.rating)}</div>
          <p className="text-gray-700">{review.comment}</p>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="overflow-hidden">
      <div className="space-y-6">
        <ReviewRow reviews={duplicatedRow1} duration={30} direction="normal" />
        <ReviewRow reviews={duplicatedRow2} duration={25} direction="reverse" />
        <ReviewRow reviews={duplicatedRow3} duration={35} direction="normal" />
      </div>
    </div>
  );
};

export default ReviewsMarquee;
